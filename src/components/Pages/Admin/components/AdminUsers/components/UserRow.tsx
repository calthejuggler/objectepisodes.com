import React from 'react';

const UserRow = props => {
	const { user, setSelectedUser } = props;
	return (
		<li
			className='list-group-item'
			onClick={() => {
				setSelectedUser(user);
			}}>
			<div className='row text-center align-items-center'>
				<div className='col-2'>
					<img
						src={user.data().photoURL}
						className='img-fluid rounded-circle'
						style={{
							objectFit: 'cover',
							width: '3rem',
							height: '3rem',
						}}
						alt={user.data().username + "'s Profile"}
					/>
				</div>
				<div className='col-2'>
					<a href={'#/user/' + user.data().username}>
						{user.data().username}
					</a>
				</div>
				<div className='col-2'>
					{user.data().firstname + ' ' + user.data().lastname}
				</div>
				<div className='col-3'>{user.data().email}</div>
				<div className='col-2'>
					{user
						.data()
						.created.toDate()
						.toDateString()}
				</div>
			</div>
		</li>
	);
};

export default UserRow;
