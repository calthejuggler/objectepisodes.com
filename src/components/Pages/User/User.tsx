import React, { useState, useEffect, FC } from 'react';
import UserDetails from './components/UserDetails';
import { useParams } from 'react-router-dom';
import { withFirebase } from '../../Firebase/context';
import PersonalForumPosts from './components/PersonalForumPosts';
import Firebase from './../../Firebase/index';
import { withAuth } from './../../Session/withAuth';

const User: FC<{
	firebase: Firebase;
	user: any;
}> = (props) => {
	const { firebase, user } = props;
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
	}, [paramUser, firebase, user.uid]);
	useEffect(() => {
		if (user.uid) {
			if (userData !== null && userData.id === user.uid) {
				setOwnProfile(true);
			}
		}
		return () => {
			setOwnProfile(false);
		};
	}, [user.uid, userData]);
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

export default withAuth(withFirebase(User));
