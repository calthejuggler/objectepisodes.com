import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../../Firebase/context';

const ListPOTD = props => {
	const { firebase } = props;

	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		firebase.db
			.collection('potd')
			.orderBy('toBeShown', 'asc')
			.onSnapshot(potdDocsSnap => {
				setPhotos([]);
				potdDocsSnap.forEach(potd => {
					firebase
						.getUserDataFromUID(potd.data().uploadedBy)
						.then(user => {
							setPhotos(prev => [
								...prev,
								{ potd: potd, user: user },
							]);
						});
				});
			});
	}, [firebase]);

	console.dir(photos);

	return (
		<>
			<ul className='list-group-flush text-center'>
				<li className='list-group-item align-items-center justify-content-center text-center'>
					<div className='row '>
						<div className='col-3'>
							<b>Image</b>
						</div>
						<div className='col-2'>
							<b>Date</b>
						</div>
						<div className='col-2'>
							<b>Uploaded By</b>
						</div>
						<div className='col-3'>
							<b>To Be Shown</b>
						</div>
						<div className='col-1'>
							<b>Shown?</b>
						</div>
						<div className='col-1'>
							<b>Delete</b>
						</div>
					</div>
				</li>

				{photos.map((photo, i) => (
					<li className='list-group-item' key={photo.potd.id}>
						<div className='row align-items-center justify-content-center text-center'>
							<div className='col-3'>
								<img
									src={photo.potd.data().photoUrl}
									alt={'POTD #' + i}
									className='img-fluid'
								/>
							</div>
							<div className='col-2'>
								<p>
									{photo.potd
										.data()
										.timestamp.toDate()
										.toDateString()}
								</p>
							</div>
							<div className='col-2'>
								<a
									href={
										'#/user/' + photo.user.data().username
									}>
									{photo.user.data().username}
								</a>
							</div>
							<div className='col-3'>
								{new Date(
									photo.potd.data().toBeShown
								).toDateString()}
							</div>
							<div className='col-1'>
								{new Date() >= photo.potd.data().toBeShown
									? 'Yes'
									: 'No'}
							</div>
							<div className='col-1'>
								<button className='btn btn-danger'>
									Delete
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default withFirebase(ListPOTD);
