import React, { useEffect, useState } from 'react';

import { withFirebase } from '../../../Firebase/context';

const DashPOTD = props => {
	const { firebase } = props;
	const [potd, setPotd] = useState(null);
	useEffect(() => {
		firebase.db
			.collection('potd')
			.where('toBeShown', '>=', new Date().setTime(0).valueOf())
			.where(
				'toBeShown',
				'<=',
				new Date().setDate(new Date().getDate() + 1).valueOf()
			)
			.limit(1)
			.get()
			.then(snapArray => {
				firebase
					.getUserDataFromUID(snapArray.docs[0].data().uploadedBy)
					.then(user => {
						setPotd({
							potd: snapArray.docs[0].data(),
							user: user.data(),
						});
					});
			});
	}, [firebase]);
	return (
		<div className='card h-100'>
			<div className='card-body text-center h-100'>
				<h4 className='card-title text-center'>Photo of the Day</h4>
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
							style={{ maxHeight: '20rem' }}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default withFirebase(DashPOTD);
