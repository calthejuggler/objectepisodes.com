import React, { useEffect, useState } from 'react';

import { withFirebase } from '../../../Firebase/context';

const RecordsList = props => {
	const {
		firebase,
		selectedRecord,
		setSelectedRecord,
		sortBy,
		sortDirection,
	} = props;

	const [records, setRecords] = useState([]);

	const [error, setError] = useState(null);

	useEffect(() => {
		setRecords([]);
		firebase.db
			.collection('records')
			.orderBy(sortBy, sortDirection)
			.get()
			.then(recordRes => {
				recordRes.forEach(record => {
					firebase
						.getUserDataFromUID(record.data().userID)
						.then(userData => {
							setRecords(prev => [
								...prev,
								{ user: userData.data(), record: record },
							]);
						});
				});
			})
			.catch(e => setError(e.message));
	}, [sortBy, sortDirection, firebase]);
	return (
		<>
			{error && <div className='alert alert-danger'>{error}</div>}
			<ul className='list-group-flush'>
				<li className='list-group-item'>
					<div className='row'>
						<div className='col-4'>
							<b>Pattern</b>
						</div>
						<div className='col-2'>
							<b>Record</b>
						</div>
						<div className='col-2'>
							<b>User</b>
						</div>
						<div className='col-2'>
							<b>Date</b>
						</div>
						<div className='col-2'>
							<b>Video</b>
						</div>
					</div>
				</li>
				{records.map(record => (
					<li className='list-group-item' key={record.record.id}>
						<div className='row'>
							<div className='col-4'>
								{record.record.data().noOfProps +
									' ' +
									record.record.data().propType +
									' ' +
									record.record.data().pattern}
							</div>
							<div className='col-2'>
								{record.record.data().recordType === 'catches'
									? record.record.data().catches + ' catches'
									: 'For ' + record.record.data().time}
							</div>
							<div className='col-2'>
								<a href={'#/users/' + record.user.username}>
									{record.user.username}
								</a>
							</div>
							<div className='col-2'>
								{record.record
									.data()
									.recorded.toDate()
									.toDateString()}
							</div>
							<div className='col-2'>
								{record.record.data().videoURL === '' ? (
									'None'
								) : (
									<a href={record.record.data().videoURL}>
										Link
									</a>
								)}
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default withFirebase(RecordsList);
