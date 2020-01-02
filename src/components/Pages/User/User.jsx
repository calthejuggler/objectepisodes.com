import React, { useState, useEffect } from 'react';
import UserDetails from './components/UserDetails';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase/context';

const User = props => {
	const { history, firebase } = props;
	const URLUser = history.location.pathname.slice(1).split('/')[1];

	const [userData, setUserData] = useState('Loading');
	const [ownProfile, setOwnProfile] = useState(false);

	useEffect(() => {
		firebase.getUserDataFromUsername(URLUser).then(userDocs => {
			if (userDocs.empty) {
				firebase.getUserDataFromUID().then(UIDUserDocs => {
					if (UIDUserDocs.empty) {
						setUserData(null);
					} else {
						UIDUserDocs.forEach(UIDUserDoc => {
							setUserData(UIDUserDoc);
						});
					}
				});
			} else {
				userDocs.forEach(userDoc => {
					setUserData(userDoc);
				});
			}
		});
	}, [URLUser, firebase]);
	useEffect(() => {
		if (firebase.auth.currentUser) {
			if (userData.id === firebase.auth.currentUser.uid) {
				setOwnProfile(true);
			}
		}
		return () => {
			setOwnProfile(false);
		};
	}, [firebase.auth.currentUser, userData.id]);
	return (
		<div className='row'>
			<div className='col-12'>
				{userData === 'Loading' ? (
					<div className='d-flex justify-content-center'>
						<div className='spinner-border mx-auto' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					</div>
				) : (
					<>
						{ownProfile ? 'yes' : 'no'}
						<UserDetails userData={userData} />
					</>
				)}
			</div>
		</div>
	);
};

export default withFirebase(withRouter(User));
