import React, { useState, useEffect } from 'react';

import { withFirebase } from '../../Firebase/context';

import EditProfileNav from './components/EditProfileNav';
import EditProfilePersonalForm from './components/EditProfilePersonalForm';

const EditProfile = props => {
	const { firebase } = props;
	const [currentSetting, setCurrentSetting] = useState('personal');

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		if (firebase.auth.currentUser) {
			firebase
				.getUserDataFromUID(firebase.auth.currentUser.uid)
				.then(userSnap => {
					setEmail(userSnap.data().email);
					setFirstname(userSnap.data().firstname);
					setLastname(userSnap.data().lastname);
				});
		}
	}, [firebase.auth.currentUser, firebase]);

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
				/>
			</div>
		</div>
	);
};

export default withFirebase(EditProfile);
