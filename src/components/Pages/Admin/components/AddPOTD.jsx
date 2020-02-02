import React, { useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import { withAuth } from '../../../Session/withAuth';

const AddPOTD = props => {
	const { firebase, user } = props;
	const [error, setError] = useState(null);

	return (
		<>
			<div className='custom-file'>
				<input
					type='file'
					multiple
					className='custom-file-input'
					onChange={e => {
						e.persist();
						setError(null);
						firebase.db
							.collection('potd')
							.get()
							.then(firestoreSnap => {
								for (
									let i = 0;
									i < e.target.files.length;
									i++
								) {
									if (e.target.files[i].size > 2000000) {
										setError(
											'Your image must be under 2MB'
										);
									} else if (
										e.target.files[i].type !==
											'image/jpeg' &&
										e.target.files[i].type !== 'image/png'
									) {
										setError(
											'Your image must have a .jpg or a .png extension.'
										);
									} else {
										const firebaseQuery = firebase.storage.ref(
											'potd/' +
												new Date().setDate(
													new Date(
														'02/02/2020'
													).getDate() +
														firestoreSnap.docs
															.length
												)
										);
										firebaseQuery
											.put(e.target.files[i])
											.then(snap => {
												snap.ref
													.getDownloadURL()
													.then(url => {
														firebase.db
															.collection('potd')
															.add({
																photoUrl: url,
																timestamp: firebase.dbFunc.FieldValue.serverTimestamp(),
																toBeShown: new Date().setDate(
																	new Date(
																		'02/02/2020'
																	).getDate() +
																		firestoreSnap
																			.docs
																			.length +
																		i
																),
																uploadedBy:
																	user.uid,
															})
															.catch(e =>
																setError(
																	e.message
																)
															);
													})
													.catch(e =>
														setError(e.message)
													);
											})
											.catch(e => setError(e.message));
									}
								}
							})
							.catch(e => setError(e.message));
					}}
				/>
				{error && <div className='alert alert-danger'>{error}</div>}
				<label className='custom-file-label' htmlFor='customFile'>
					Choose files...
				</label>
			</div>
		</>
	);
};

export default withAuth(withFirebase(AddPOTD));
