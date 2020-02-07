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
			<h3 className='text-center'>Records List</h3>
			{error && <div className='alert alert-danger'>{error}</div>}
			<ul className='list-group list-group-flush text-center'>
				<li className='list-group-item'>
					<div className='row'>
						<div className='col-4 col-md-3'>
							<b>Pattern</b>
						</div>
						<div className='col-4 col-md-3'>
							<b>Record</b>
						</div>
						<div className='col-4 col-md-2'>
							<b>User</b>
						</div>
						<div className='d-none d-md-block col-md-2'>
							<b>Date</b>
						</div>
						<div className='d-none d-md-block col-md-2'>
							<b>Video</b>
						</div>
					</div>
				</li>
				{records.map(record => (
					<li
						className={
							'list-group-item ' +
							(selectedRecord === record &&
								'bg-secondary text-light')
						}
						key={record.record.id}
						onClick={() => setSelectedRecord(record)}>
						<div className='row'>
							<div className='col-4 col-md-3'>
								{record.record.data().noOfProps +
									' ' +
									record.record.data().propType +
									' ' +
									record.record.data().pattern}
							</div>
							<div className='col-4 col-md-3'>
								{record.record.data().recordType === 'catches'
									? record.record.data().catches + ' catches'
									: 'For ' + record.record.data().time}
							</div>
							<div className='col-4 col-md-2'>
								<a href={'#/users/' + record.user.username}>
									{record.user.username}
								</a>
							</div>
							<div className='d-none d-md-block col-md-2'>
								{record.record
									.data()
									.recorded.toDate()
									.toDateString()}
							</div>
							<div className='d-none d-md-block col-md-2'>
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
