import React from 'react';

import ProfilePicture from '../../../elements/ProfilePicture';

const Inspector = props => {
	const { selectedRecord } = props;
	return (
		<div className='row'>
			{selectedRecord ? (
				<>
					<div className='col-12 col-md-4 text-center'>
						<h5>User Details</h5>
						<ProfilePicture
							userID={selectedRecord.record.data().userID}
							size={['7rem', '7rem']}
						/>
						<ul>
							<li>
								<p>
									<b>Username:</b>{' '}
									<a
										href={
											'#/user/' +
											selectedRecord.user.username
										}>
										{selectedRecord.user.username}
									</a>
								</p>
							</li>
							<li>
								<p>
									<b>Name:</b>{' '}
									{selectedRecord.user.firstname +
										' ' +
										selectedRecord.user.lastname}
								</p>
							</li>
						</ul>
					</div>
					<div className='col-12 col-md-8 text-center'>
						<h5>Record Details</h5>
					</div>
				</>
			) : (
				'Please select a record to inspect.'
			)}
		</div>
	);
};

export default Inspector;
