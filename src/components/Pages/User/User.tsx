import React, { useState, useEffect, FC } from 'react';
import UserDetails from './components/UserDetails';
import { useParams } from 'react-router-dom';
import { withFirebase } from '../../Firebase/context';
import PersonalForumPosts from './components/PersonalForumPosts';
import Firebase from './../../Firebase/index';

const User: FC<{
	firebase: Firebase;
}> = (props) => {
	const { firebase } = props;
	const { paramUser } = useParams();

	const [userData, setUserData] = useState<any>('Loading');
	const [ownProfile, setOwnProfile] = useState(false);

	useEffect(() => {
		if (typeof paramUser === 'string')
			firebase.getUserDataFromUsername(paramUser).then((userDocs) => {
				if (!userDocs.empty) {
					firebase
						.getUserDataFromUID(userDocs.docs[0].id)
						.then((UIDUserDocs) => {
							if (UIDUserDocs.empty) {
								setUserData(null);
							} else {
								setUserData(UIDUserDocs);
							}
						});
				} else {
					userDocs.forEach((userDoc: any) => {
						setUserData(userDoc);
					});
				}
			});
	}, [paramUser, firebase]);
	useEffect(() => {
		if (firebase.auth.currentUser) {
			if (
				userData !== null &&
				userData.id === firebase.auth.currentUser.uid
			) {
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
			</div>
			<div className='col-12 col-md-8'>
				<PersonalForumPosts userData={userData} />
			</div>
		</div>
	);
};

export default withFirebase(User);
