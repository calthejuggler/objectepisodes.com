import React, { useEffect, useState, FC } from 'react';
import { withFirebase } from '../../../../Firebase/context';
import MostRecord from './components/MostRecord';
import Firebase from './../../../../Firebase/index';

const DashRecords: FC<{ firebase: Firebase }> = props => {
	const { firebase } = props;

	const [mostBalls, setMostBalls] = useState<null | {
		record: any;
		user: any;
	}>(null);
	const [mostClubs, setMostClubs] = useState<null | {
		record: any;
		user: any;
	}>(null);
	const [mostRings, setMostRings] = useState<null | {
		record: any;
		user: any;
	}>(null);

	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		firebase.db
			.collection('records')
			.where('propType', '==', 'ball')
			.orderBy('noOfProps', 'desc')
			.limit(1)
			.get()
			.then((mostBallsDocs: any) => {
				mostBallsDocs.forEach((doc: any) => {
					firebase
						.getUserDataFromUID(doc.data().userID)
						.then(userDoc => {
							setMostBalls({ record: doc, user: userDoc });
						});
				});
			})
			.catch((e: { message: string }) => setError(e.message));
		firebase.db
			.collection('records')
			.where('propType', '==', 'club')
			.orderBy('noOfProps', 'desc')
			.limit(1)
			.get()
			.then((mostClubsDocs: any) => {
				mostClubsDocs.forEach((doc: any) => {
					firebase
						.getUserDataFromUID(doc.data().userID)
						.then(userDoc => {
							setMostClubs({ record: doc, user: userDoc });
						});
				});
			})
			.catch((e: { message: string }) => setError(e.message));
		firebase.db
			.collection('records')
			.where('propType', '==', 'ring')
			.orderBy('noOfProps', 'desc')
			.limit(1)
			.get()
			.then((mostRingsDocs: any) => {
				mostRingsDocs.forEach((doc:any) => {
					firebase
						.getUserDataFromUID(doc.data().userID)
						.then(userDoc => {
							setMostRings({ record: doc, user: userDoc });
						});
				});
			})
			.catch((e: { message: string }) => setError(e.message));
	}, [firebase]);
	return (
		<>
			{error ? (
				<div className='alert alert-danger'>{error}</div>
			) : (
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
			)}
		</>
	);
};

export default withFirebase(DashRecords);
