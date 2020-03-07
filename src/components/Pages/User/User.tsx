import React, { useState, useEffect, FC } from 'react';
import UserDetails from './components/UserDetails';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withFirebase } from '../../Firebase/context';
import PersonalRecords from './components/PersonalRecords';
import PersonalForumPosts from './components/PersonalForumPosts';
import Firebase from './../../Firebase/index';

interface Props extends RouteComponentProps {
	firebase: Firebase;
}

const User: FC<Props> = props => {
	const { history, firebase } = props;
	const URLUser = history.location.pathname.slice(1).split('/')[1];

	const [userData, setUserData] = useState<any>('Loading');
	const [ownProfile, setOwnProfile] = useState(false);

	useEffect(() => {
		firebase.getUserDataFromUsername(URLUser).then(userDocs => {
			if (!userDocs.empty) {
				firebase.getUserDataFromUID(userDocs.docs[0].id).then(UIDUserDocs => {
					if (UIDUserDocs.empty) {
						setUserData(null);
					} else {
						UIDUserDocs.forEach((UIDUserDoc:any) => {
							setUserData(UIDUserDoc);
						});
					}
				});
			} else {
				userDocs.forEach((userDoc:any) => {
					setUserData(userDoc);
				});
			}
		});
	}, [URLUser, firebase]);
	useEffect(() => {
		if (firebase.auth.currentUser) {
			if (userData!==null && userData.id === firebase.auth.currentUser.uid) {
				setOwnProfile(true);
			}
		}
		return () => {
			setOwnProfile(false);
		};
	}, [firebase.auth.currentUser, userData]);
	return (
		<div className='row'>
			<div className='col-12 col-md-4'>
				<UserDetails userData={userData} ownProfile={ownProfile} />
				<PersonalRecords userData={userData} ownProfile={ownProfile} />
			</div>
			<div className='col-12 col-md-8'>
				<PersonalForumPosts userData={userData} />
			</div>
		</div>
	);
};

export default withRouter(withFirebase(User));
