import React, { FC } from 'react';

import { withFirebase } from '../../Firebase/context';
import { useEffect } from 'react';
import { useState } from 'react';
import POTDCard from './components/POTDCard';
import Firebase from './../../Firebase/index';

const POTD: FC<{ firebase: Firebase }> = props => {
	const { firebase } = props;

	const [photoData, setPhotoData] = useState<
		Array<{ photo: any; user: any }>
	>([]);

	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		firebase.db
			.collection('potd-archive')
			.orderBy('shown', 'desc')
			.get()
			.then((potdSnap: any) => {
				potdSnap.forEach((photo: any) => {
					firebase
						.getUserDataFromUID(photo.data().uploadedBy)
						.then(userData => {
							setPhotoData(prev => [
								...prev,
								{ photo: photo, user: userData }
							]);
						})
						.catch(e => setError(e.message));
				});
			});
	}, [firebase]);

	return (
		<>
			<h1 className='text-center'>Previous Photos of The Day</h1>
			{error && <div className='alert alert-danger'>{error}</div>}
			<div className='row align-items-center justify-content-between'>
				{photoData.map(photo => (
					<POTDCard photoData={photo} />
				))}
			</div>
		</>
	);
};

export default withFirebase(POTD);
