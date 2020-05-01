import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Firebase from './../../Firebase/index';
import { FC } from 'react';
import ProfilePicture from './../../elements/ProfilePicture';
import { withFirebase } from './../../Firebase/context';
interface Props extends RouteComponentProps<any> {
	user: any;
	userData: { username: string };
	firebase: Firebase;
}

const UserHeader: FC<Props> = props => {
	const { user, userData } = props;

	return user && userData ? (
		<div className='text-center'>
			<ProfilePicture userID={user.uid} size={['5rem', '5rem']} />
			<p>
				Logged in as{' '}
				<a href={'#/users/' + userData.username}>{userData.username}</a>
				<br />
				<button
					className='btn btn-link btn-sm'
					onClick={() => {
						props.firebase.doSignOut();
					}}
				>
					Sign Out?
				</button>
			</p>
		</div>
	) : (
		<div className='d-flex justify-content-center'>
			<div
				className='btn btn-primary mr-3'
				onClick={() => props.history.push('/login')}
			>
				Login
			</div>
			<div
				className='btn btn-secondary ml-3'
				onClick={() => props.history.push('/register')}
			>
				Register
			</div>
		</div>
	);
};

export default withRouter(withFirebase(UserHeader));
