import React, { useEffect, useState, FC, SetStateAction } from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import UserRow from './UserRow';
import Firebase from './../../../../../Firebase/config';

interface Props {
	firebase: Firebase;
	setSelectedUser: SetStateAction<any>;
}

const UsersList: FC<Props> = props => {
	const { firebase, setSelectedUser } = props;

	const [sortBy, setSortBy] = useState('created');
	const [sortDirection, setSortDirection] = useState('desc');

	const [userArray, setUserArray] = useState<Array<any>>([]);

	useEffect(() => {
		return firebase.db
			.collection('users')
			.orderBy(sortBy, sortDirection)
			.onSnapshot((usersSnap: any) => {
				setUserArray([]);
				usersSnap.forEach((user: any) =>
					setUserArray((prev: Array<any>) => [...prev, user])
				);
			});
	}, [firebase.db, sortBy, sortDirection]);
	return (
		<>
			<div className='input-group w-50 mx-auto'>
				<div className='input-group-prepend'>
					<button
						className='btn btn-primary'
						onClick={() => {
							sortDirection === 'desc'
								? setSortDirection('asc')
								: setSortDirection('desc');
						}}
					>
						{sortDirection[0].toUpperCase() +
							sortDirection.slice(1) +
							'.'}
					</button>
				</div>
				<select
					className='custom-select'
					value={sortBy}
					onChange={e => setSortBy(e.target.value)}
					name='sortBy'
				>
					<option value='created'>Added</option>
					<option value='firstname'>Name</option>
					<option value='username'>Username</option>
					<option value='forumPosts'>Forum Posts</option>
					<option value='likes'>Likes</option>
				</select>
			</div>
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
		</>
	);
};

export default withFirebase(UsersList);
