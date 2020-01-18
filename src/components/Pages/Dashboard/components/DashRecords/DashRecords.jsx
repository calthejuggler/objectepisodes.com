import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../../Firebase/context';
import MostRecord from './components/MostRecord';

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
		<div className='card h-100'>
			<div className='card-body text-center'>
				<h3 className='card-title'>Top Records</h3>
				<ul className='list-group list-group-flush text-left'>
					<li className='list-group-item'>
						<div className='row align-items-center'>
							{mostBalls && (
								<MostRecord
									title='Most Balls:'
									recordProp={mostBalls}
								/>
							)}
						</div>
					</li>
					<li className='list-group-item'>
						<div className='row align-items-center'>
							{mostClubs && (
								<MostRecord
									title='Most Clubs:'
									recordProp={mostClubs}
								/>
							)}
						</div>
					</li>
					<li className='list-group-item'>
						<div className='row align-items-center'>
							{mostRings && (
								<MostRecord
									title='Most Rings:'
									recordProp={mostRings}
								/>
							)}
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default withFirebase(DashRecords);
