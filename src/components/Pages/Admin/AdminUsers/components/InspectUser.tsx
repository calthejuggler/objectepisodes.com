import React, { FC } from 'react';
import { withAuth } from '../../../../Session/withAuth';
import { useState } from 'react';
import { useEffect } from 'react';
import { withFirebase } from '../../../../Firebase/context';
import Firebase from '../../../../Firebase/config';

interface Props {
	selectedUser: any;
	firebase: Firebase;
	user: any;
}

const InspectUser: FC<Props> = (props) => {
	const { selectedUser, firebase, user } = props;

	const [userIsAdmin, setUserIsAdmin] = useState(false);

	useEffect(() => {
		if (user) {
			firebase.getUserDataFromUID(user.uid).then((userSnap) => {
				if (userSnap.data().admin) setUserIsAdmin(true);
			});
		}
	}, [firebase]);

	return !selectedUser ? (
		<>
			<h3>User Inspector</h3>
			<p>Please select a user below</p>
		</>
	) : (
		<div className='row'>
			<div className='col-3'>
				<h5 className='text-center'>Profile Picture</h5>
				<img
					src={selectedUser.data().photoURL}
					alt={selectedUser.data().username + "'s Profile"}
					style={{
						width: '10rem',
						height: '10rem',
						objectFit: 'cover',
					}}
					className='img-fluid rounded-circle d-block mx-auto'
				/>
			</div>
			<div className='col-6'>
				<h5 className='text-center'>Details</h5>
				<ul>
					<li>
						<b>Username: </b>
						{selectedUser.data().username}
					</li>
					<li>
						<b>Full Name: </b>
						{selectedUser.data().firstname +
							' ' +
							selectedUser.data().lastname}
					</li>
					<li>
						<b>Email: </b>
						{selectedUser.data().email}
					</li>
					<li>
						<b>Account Created: </b>
						{selectedUser.data().created.toDate().toDateString()}
					</li>
					<li>
						<b>Forum Posts: </b>
						{selectedUser.data().forumPosts}
					</li>
					<li>
						<b>Admin: </b>
						{selectedUser.data().admin ? 'Yes' : 'No'}
					</li>
				</ul>
			</div>
			<div className='col-3'>
				<h5 className='text-center'>Actions</h5>
				<button
					disabled={userIsAdmin}
					className='btn btn-danger d-block mx-auto mb-1'
				>
					Delete Account
				</button>
				<button
					disabled={userIsAdmin}
					className='btn btn-warning d-block mx-auto'
				>
					Ban Account
				</button>
				<hr />
				<button
					disabled={userIsAdmin}
					className='btn btn-success d-block mx-auto'
				>
					Make Admin
				</button>
			</div>
		</div>
	);
};

export default withAuth(withFirebase(InspectUser));
