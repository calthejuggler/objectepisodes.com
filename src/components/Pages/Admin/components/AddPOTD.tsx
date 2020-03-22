import React, { useState, FC, ChangeEvent } from 'react';
import { withFirebase } from '../../../Firebase/context';
import { withAuth } from '../../../Session/withAuth';
import Firebase from './../../../Firebase/index';

interface Props {
	firebase: Firebase;
	user: { uid: string };
}

const AddPOTD: FC<Props> = props => {
	const { firebase, user } = props;
	const [files, setFiles] = useState<FileList>(new FileList());

	const [error, setError] = useState<null | string>(null);

	const uploadPhotos = (
		firebaseQuery: any,
		firestoreSnap: any,
		i: number
	) => {
		firebaseQuery
			.put(files[i])
			.then((snap: any) => {
				snap.ref
					.getDownloadURL()
					.then((url: any) => {
						firebase.db
							.collection('potd')
							.add({
								photoUrl: url,
								timestamp: firebase.dbFunc.FieldValue.serverTimestamp(),
								toBeShown: new Date().setDate(
									new Date('02/02/2020').getDate() +
										firestoreSnap.docs.length +
										i
								),
								uploadedBy: user.uid
							})
							.catch((e: { message: string }) =>
								setError(e.message)
							);
					})
					.catch((e: { message: string }) => setError(e.message));
			})
			.catch((e: { message: string }) => setError(e.message));
	};

	const manageUploads = (firestoreSnap: any) => {
		for (let i = 0; i < files.length; i++) {
			if (files[i].size > 2000000) {
				setError('Your image must be under 2MB');
			} else if (
				files[i].type !== 'image/jpeg' &&
				files[i].type !== 'image/png'
			) {
				setError('Your image must have a .jpg or a .png extension.');
			} else {
				const firebaseQuery = firebase.storage.ref(
					'potd/' +
						new Date().setDate(
							new Date('02/02/2020').getDate() +
								firestoreSnap.docs.length
						)
				);
				uploadPhotos(firebaseQuery, firestoreSnap, i);
			}
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setError(null);
		if (e.target.files !== null) setFiles(e.target.files);
		firebase.db
			.collection('potd')
			.get()
			.then((firestoreSnap: any) => {
				manageUploads(firestoreSnap);
			})
			.catch((e: { message: string }) => setError(e.message));
	};

	return (
		<>
			<div className='custom-file'>
				<input
					type='file'
					multiple
					className='custom-file-input'
					onChange={handleChange}
				/>
				{error && <div className='alert alert-danger'>{error}</div>}
				<label className='custom-file-label' htmlFor='customFile'>
					Choose files...
				</label>
			</div>
		</>
	);
};

export default withFirebase(withAuth(AddPOTD));
