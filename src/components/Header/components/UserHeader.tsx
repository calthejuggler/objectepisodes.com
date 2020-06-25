import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Firebase from './../../Firebase/index';
import { FC } from 'react';
import ProfilePicture from './../../elements/ProfilePicture';
import { withFirebase } from './../../Firebase/context';
import { UserContextInterface } from '../../Session/context';
interface Props extends RouteComponentProps<any> {
	user: UserContextInterface;
	userData: firebase.firestore.DocumentData;
	firebase: Firebase;
}

const UserHeader: FC<Props> = ({ userData, firebase, history }) => {
	return userData ? (
		<div className='text-center'>
			<ProfilePicture
				photoURL={userData.photoURL}
				size={['5rem', '5rem']}
			/>
			<p>
				Logged in as{' '}
				<a href={'#/users/' + userData.username}>
					{userData.username}
				</a>
				<br />
				<button
					className='btn btn-link btn-sm'
					onClick={() => {
						firebase.doSignOut();
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
				onClick={() => history.push('/login')}
			>
				Login
			</div>
			<div
				className='btn btn-secondary ml-3'
				onClick={() => history.push('/register')}
			>
				Register
			</div>
		</div>
	);
};

export default withRouter(withFirebase(UserHeader));
