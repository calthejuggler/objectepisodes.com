import React from 'react';

import { withFirebase } from '../../Firebase/context';
import { useEffect } from 'react';
import { useState } from 'react';
import POTDCard from './components/POTDCard';

const POTD = props => {
	const { firebase } = props;

	const [photoData, setPhotoData] = useState([]);

	const [error, setError] = useState(null);

	useEffect(() => {
		firebase.db
			.collection('potd-archive')
			.orderBy('shown', 'desc')
			.get()
			.then(potdSnap => {
				potdSnap.forEach(photo => {
					firebase
						.getUserDataFromUID(photo.data().uploadedBy)
						.then(userData => {
							setPhotoData(prev => [
								...prev,
								{ photo: photo, user: userData },
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
