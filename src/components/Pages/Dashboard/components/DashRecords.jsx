import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';

const DashRecords = props => {
	const { firebase } = props;

	const [mostBalls, setMostBalls] = useState(null);
	const [mostClubs, setMostClubs] = useState(null);
	const [mostRings, setMostRings] = useState(null);
    
	useLayoutEffect(() => {
		firebase.db
			.collection('records')
			.where('propType', '==', 'ball')
			.orderBy('noOfProps', 'desc')
			.limit(1)
			.get()
			.then(mostBallsDocs => {
				mostBallsDocs.forEach(doc => {
					firebase
						.getUserDataFromUID(doc.data().userID)
						.then(userDoc => {
							setMostBalls({ record: doc, user: userDoc });
						});
				});
			});
		firebase.db
			.collection('records')
			.where('propType', '==', 'club')
			.orderBy('noOfProps', 'desc')
			.limit(1)
			.get()
			.then(mostClubsDocs => {
				mostClubsDocs.forEach(doc => {
					firebase
						.getUserDataFromUID(doc.data().userID)
						.then(userDoc => {
							setMostClubs({ record: doc, user: userDoc });
						});
				});
			});
		firebase.db
			.collection('records')
			.where('propType', '==', 'ring')
			.orderBy('noOfProps', 'desc')
			.limit(1)
			.get()
			.then(mostRingsDocs => {
				mostRingsDocs.forEach(doc => {
					firebase
						.getUserDataFromUID(doc.data().userID)
						.then(userDoc => {
							setMostRings({ record: doc, user: userDoc });
						});
				});
			});
	}, [firebase]);
	return (
		<div className='card mt-3'>
			<div className='card-body text-center'>
				<h4 className='card-title'>Top Records</h4>
				<ul className='list-group list-group-flush text-left'>
					<li className='list-group-item'>
						<div className='row align-items-center'>
							{mostBalls && (
								<>
									<div className='col-5'>
										<p>
											<b>Most balls:</b>
										</p>
									</div>
									<div className='col-7 text-center'>
										<a
											href={
												'#/user/' +
												mostBalls.user.data().username
											}>
											{mostBalls.user.data().username}
										</a>
										<p>
											{mostBalls.record.data().noOfProps}{' '}
											ball{' '}
											{mostBalls.record.data().pattern}{' '}
											for{' '}
											{mostBalls.record.data()
												.recordType === 'catches'
												? mostBalls.record.data()
														.catches + ' catches'
												: mostBalls.record.data().time +
												  ' minutes'}
										</p>
									</div>
								</>
							)}
						</div>
					</li>
					<li className='list-group-item'>
						<div className='row align-items-center'>
							{mostClubs && (
								<>
									<div className='col-5'>
										<p>
											<b>Most clubs:</b>
										</p>
									</div>
									<div className='col-7 text-center'>
										<a
											href={
												'#/user/' +
												mostClubs.user.data().username
											}>
											{mostClubs.user.data().username}
										</a>
										<p>
											{mostClubs.record.data().noOfProps}{' '}
											club{' '}
											{mostClubs.record.data().pattern}{' '}
											for{' '}
											{mostClubs.record.data()
												.recordType === 'catches'
												? mostClubs.record.data()
														.catches + ' catches'
												: mostClubs.record.data().time +
												  ' minutes'}
										</p>
									</div>
								</>
							)}
						</div>
					</li>
					<li className='list-group-item'>
						<div className='row align-items-center'>
							{mostRings && (
								<>
									<div className='col-5'>
										<p>
											<b>Most rings:</b>
										</p>
									</div>
									<div className='col-7 text-center'>
										<a
											href={
												'#/user/' +
												mostRings.user.data().username
											}>
											{mostRings.user.data().username}
										</a>
										<p>
											{mostRings.record.data().noOfProps}{' '}
											ring{' '}
											{mostRings.record.data().pattern}{' '}
											for{' '}
											{mostRings.record.data()
												.recordType === 'catches'
												? mostRings.record.data()
														.catches + ' catches'
												: mostRings.record.data().time +
												  ' minutes'}
										</p>
									</div>
								</>
							)}
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default withFirebase(DashRecords);
