import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import UserRow from './UserRow';

const UsersList = props => {
	const { firebase, setSelectedUser } = props;

	const [sortBy, setSortBy] = useState('created');
	const [sortDirection, setSortDirection] = useState('desc');

	const [userArray, setUserArray] = useState([]);

	useEffect(() => {
		return firebase.db
			.collection('users')
			.orderBy(sortBy, sortDirection)
			.onSnapshot(usersSnap => {
				setUserArray([]);
				usersSnap.forEach(user =>
					setUserArray(prev => [...prev, user])
				);
			});
	}, [firebase.db, sortBy, sortDirection]);
	return (
		<ul className='list-group-flush'>
			<li className='list-group-item'>
				<div className='row text-center'>
					<div className='col-2'>
						<b>Pic</b>
					</div>
					<div className='col-2'>
						<b>Username</b>
					</div>
					<div className='col-2'>
						<b>Name</b>
					</div>
					<div className='col-3'>
						<b>Email</b>
					</div>
					<div className='col-2'>
						<b>Created</b>
					</div>
				</div>
			</li>
			{userArray !== [] &&
				userArray.map(user => (
					<UserRow
						user={user}
						key={user.id}
						setSelectedUser={setSelectedUser}
					/>
				))}
		</ul>
	);
};

export default withFirebase(UsersList);
