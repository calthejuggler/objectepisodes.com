import React from 'react';

import ProfilePicture from '../../../elements/ProfilePicture';

const Inspector = props => {
	const { selectedRecord } = props;
	return (
		<div className='row align-items-center'>
			{selectedRecord ? (
				<>
					<div className='col-12 col-md-4 text-center'>
						<h5>User Details</h5>
						<ProfilePicture
							userID={selectedRecord.record.data().userID}
							size={['7rem', '7rem']}
						/>
						<ul className='list-group mt-3'>
							<li className='list-group-item'>
								<div className='row'>
									<div className='col-6'>
										<b>Username:</b>{' '}
									</div>
									<div className='col-6'>
										<a
											href={
												'#/user/' +
												selectedRecord.user.username
											}>
											{selectedRecord.user.username}
										</a>
									</div>
								</div>
							</li>
							<li className='list-group-item'>
								<div className='row'>
									<div className='col-6'>
										<b>Name:</b>{' '}
									</div>
									<div className='col-6'>
										{selectedRecord.user.firstname +
											' ' +
											selectedRecord.user.lastname}
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div className='col-12 col-md-8 text-center'>
						<h5>Record Details</h5>
						<ul className='list-group'>
							<li className='list-group-item'>
								<div className='row'>
									<div className='col-6'>
										<b>Pattern:</b>
									</div>
									<div className='col-6'>
										{selectedRecord.record.data()
											.noOfProps +
											' ' +
											selectedRecord.record.data()
												.propType +
											' ' +
											selectedRecord.record.data()
												.pattern}
									</div>
								</div>
							</li>
							<li className='list-group-item'>
								<div className='row'>
									<div className='col-6'>
										<b>Record:</b>
									</div>
									<div className='col-6'>
										{selectedRecord.record.data()
											.recordType === 'time'
											? selectedRecord.record.data()
													.time + ' minutes'
											: selectedRecord.record.data()
													.catches + ' catches'}
									</div>
								</div>
							</li>
							<li className='list-group-item'>
								<div className='row'>
									<div className='col-6'>
										<b>Recorded On:</b>
									</div>
									<div className='col-6'>
										{selectedRecord.record
											.data()
											.recorded.toDate()
											.toUTCString()}
									</div>
								</div>
							</li>
							<li className='list-group-item'>
								<div className='row'>
									<div className='col-6'>
										<b>Video URL:</b>
									</div>
									<div className='col-6'>
										{selectedRecord.record.data()
											.videoURL !== '' ? (
											<a
												href={
													selectedRecord.record.data()
														.videoURL
												}>
												{
													selectedRecord.record.data()
														.videoURL
												}
											</a>
										) : (
											'None'
										)}
									</div>
								</div>
							</li>
						</ul>
					</div>
				</>
			) : (
				<div className='col-12'>
					<p className='text-center'>
						Please select a record to inspect.
					</p>
				</div>
			)}
		</div>
	);
};

export default Inspector;
