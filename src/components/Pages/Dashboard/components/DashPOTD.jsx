import React, { useEffect, useState } from 'react';

import { withFirebase } from '../../../Firebase/context';

const DashPOTD = props => {
	const { firebase } = props;
	const [potd, setPotd] = useState(null);
	const [error, setError] = useState(null);
	useEffect(() => {
		firebase.db
			.collection('potd')
			.orderBy('timestamp', 'asc')
			.limit(2)
			.get()
			.then(snapArray => {
				if (snapArray.empty) {
					setError('ERROR: There were no POTDs in the Database :(');
				} else if (!snapArray.docs[0].data().shown) {
					firebase.db
						.collection('potd')
						.doc(snapArray.docs[0].id)
						.update({
							shown: firebase.dbFunc.FieldValue.serverTimestamp(),
						})
						.then(res => {
							firebase
								.getUserDataFromUID(
									snapArray.docs[0].data().uploadedBy
								)
								.then(user => {
									setPotd({
										potd: snapArray.docs[0].data(),
										user: user.data(),
									});
								});
						});
				} else if (
					snapArray.docs[0]
						.data()
						.shown.toDate()
						.getDate() < new Date().getDate() ||
					(snapArray.docs[0]
						.data()
						.shown.toDate()
						.getDate() !== 0 &&
						new Date().getDate() === 0)
				) {
					firebase.db
						.collection('potd-archive')
						.doc(snapArray.docs[0].id)
						.set(snapArray.docs[0].data())
						.then(res => {
							firebase.db
								.collection('potd')
								.doc(snapArray.docs[0].id)
								.delete()
								.then(() => {
									firebase
										.getUserDataFromUID(
											snapArray.docs[1].data().uploadedBy
										)
										.then(user => {
											setPotd({
												potd: snapArray.docs[1].data(),
												user: user.data(),
											});
										});
								});
						});
				} else {
					firebase
						.getUserDataFromUID(snapArray.docs[1].data().uploadedBy)
						.then(user => {
							setPotd({
								potd: snapArray.docs[1].data(),
								user: user.data(),
							});
						});
				}
			})
			.catch(e => setError(e.message));
	}, [firebase]);
	return (
		<>
			{potd && (
				<>
					<p className='text-center small'>
						Uploaded By:{' '}
						<a href={'#/user/' + potd.user.username}>
							{potd.user.username}
						</a>
					</p>
					<img
						src={potd.potd.photoUrl}
						alt='Placeholder'
						className='img-fluid'
						style={{ maxHeight: '18rem' }}
					/>
				</>
			)}
			{error && <div className='alert alert-danger'>{error}</div>}
		</>
	);
};

export default withFirebase(DashPOTD);
