import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddPersonalRecord from './AddPersonalRecord';
import PersonalRecordRow from './PersonalRecordRow';

const PersonalRecords = props => {
	const { userData, firebase, ownProfile } = props;
	const [personalBests, setPersonalBests] = useState([]);
	useEffect(() => {
		if (userData) {
			firebase.db
				.collection('records')
				.where('userID', '==', userData.id)
				.onSnapshot(personalBestsSnap => {
					setPersonalBests([]);
					personalBestsSnap.forEach(personalBest =>
						setPersonalBests(prev => [...prev, personalBest])
					);
				});
		}
		return () => {
			setPersonalBests([]);
		};
	}, [firebase.db, userData]);
	return (
		<div className='card mt-3'>
			<div className='card-body text-center'>
				<h2 className='card-title'>Personal Records</h2>
				<div className="row align-items-center">
					<div className="col"><b>Record</b></div>
					<div className="col"><b>Evidence</b></div>
					<div className="col"><b>Date Recorded</b></div>
				</div>
				{personalBests.length === 0 ? (
					ownProfile ? (
						<p className='card-text'>
							You have no personal records.
						</p>
					) : (
						<p className='card-text'>
							This user has no personal records.
						</p>
					)
				) : personalBests.map(record => (
					<PersonalRecordRow
						key={record.id}
						noOfProps={record.data().noOfProps}
						propType={record.data().propType}
						pattern={record.data().pattern}
						recordType={record.data().recordType}
						recorded={record.data().recorded}
						videoURL={record.data().videoURL}
						recordData={record.data()}
					/>
				))}
				{ownProfile ? (
					<button
						type='button'
						className='btn btn-primary'
						data-toggle='modal'
						data-target='#addPersonalRecord'>
						Add Personal Record
					</button>
				) : null}
				{ownProfile && <AddPersonalRecord />}
			</div>
		</div>
	);
};

export default withFirebase(PersonalRecords);
