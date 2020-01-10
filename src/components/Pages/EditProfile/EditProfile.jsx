import React, { useState, useEffect, useCallback } from 'react';

import { withFirebase } from '../../Firebase/context';

import EditProfileNav from './components/EditProfileNav';
import EditProfilePersonalForm from './components/EditProfilePersonalForm';
import { withAuth } from '../../Session/withAuth';

const EditProfile = props => {
	const { firebase, user } = props;
	const [currentSetting, setCurrentSetting] = useState('personal');

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');

	const saveChanges = e => {
		e.preventDefault();
		firebase.db
			.collection('users')
			.doc(user.uid)
			.update({
				firstname: firstname,
				lastname: lastname,
				email: email,
			});
	};

	const loadUserInfo = useCallback(
		e => {
			if (e) e.preventDefault();
			if (user) {
				firebase
					.getUserDataFromUID(firebase.auth.currentUser.uid)
					.then(userSnap => {
						setEmail(userSnap.data().email);
						setFirstname(userSnap.data().firstname);
						setLastname(userSnap.data().lastname);
					});
			}
		},
		[firebase, user]
	);

	useEffect(() => {
		loadUserInfo();
	}, [loadUserInfo]);

	return (
		<div className='row'>
			<div className='col-12 col-md-4'>
				<EditProfileNav
					setCurrentSetting={setCurrentSetting}
					currentSetting={currentSetting}
				/>
			</div>
			<div className='col-12 mt-2 mt-md-0 col-md-8'>
				<EditProfilePersonalForm
					firstname={firstname}
					lastname={lastname}
					email={email}
					setFirstname={setFirstname}
					setLastname={setLastname}
					setEmail={setEmail}
					saveChanges={saveChanges}
					loadUserInfo={loadUserInfo}
				/>
			</div>
		</div>
	);
};

export default withAuth(withFirebase(EditProfile));
