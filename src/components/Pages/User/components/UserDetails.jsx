import React from 'react';

const UserDetails = props => {
	const { userData } = props;
	return (
		<div className='card'>
			<div className='card-body'>
				<ul className="list-unstyled">
					<li>Name: <b>{userData.firstname + ' ' + userData.lastname}</b></li>
					<li>Username: <b>{userData.username}</b></li>
					<li>Account Created: <b>{userData.created.toDate().toDateString()}</b></li>
				</ul>
			</div>
		</div>
	);
};

export default UserDetails;
