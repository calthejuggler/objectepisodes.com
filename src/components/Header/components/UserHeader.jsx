import React from 'react';
import ProfilePicture from '../../elements/ProfilePicture';

const UserHeader = props => {
	const { user, userData } = props;
	return user && userData ? (
		<div className='text-center'>
			<ProfilePicture userID={user.uid} size={['5rem', '5rem']} />
			<p>
				Logged in as{' '}
				<a href={'#/user/' + userData.username}>{user.displayName}</a>
				<br />
				<button
					className='btn btn-link btn-sm'
					onClick={() => {
						props.firebase.doSignOut();
					}}>
					Sign Out?
				</button>
			</p>
		</div>
	) : (
		<div className='d-flex justify-content-center'>
			<div
				className='btn btn-primary mr-3'
				onClick={() => props.history.push('/login')}>
				Login
			</div>
			<div
				className='btn btn-secondary ml-3'
				onClick={() => props.history.push('/register')}>
				Register
			</div>
		</div>
	);
};

export default UserHeader;
