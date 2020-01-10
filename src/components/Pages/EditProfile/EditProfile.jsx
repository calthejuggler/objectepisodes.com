import React, { useState, useEffect, useCallback } from 'react';

import { withFirebase } from '../../Firebase/context';

import EditProfileNav from './components/EditProfileNav';
import EditProfilePersonalForm from './components/EditProfilePersonalForm';
import { withAuth } from '../../Session/withAuth';
import EditProfileForm from './components/EditProfileForm';

const EditProfile = props => {
	const { firebase, user } = props;
	const [currentSetting, setCurrentSetting] = useState(
		'Personal Information'
	);

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');

	const [error, setError] = useState(null);

	const saveChanges = e => {
		e.preventDefault();
		if (validateForm()) {
			firebase.db
				.collection('users')
				.doc(user.uid)
				.update({
					firstname: firstname,
					lastname: lastname,
					email: email,
					username: username,
				});
		}
	};

	const validateForm = () => {
		if (firstname === '' || lastname === '') {
			setError('You must have both a firstname and a lastname.');
			return false;
		}
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
						setUsername(userSnap.data().username);
					});
			}
		},
		[firebase, user]
	);

	useEffect(() => {
		loadUserInfo();
	}, [loadUserInfo]);

	return (
		<>
			{error && (
				<div className='row'>
					<div className='col-12'>
						<div className='alert alert-danger'>{error}</div>
					</div>
				</div>
			)}
			<div className='row'>
				<div className='col-12 col-md-4'>
					<EditProfileNav
						setCurrentSetting={setCurrentSetting}
						currentSetting={currentSetting}
					/>
				</div>
				<div className='col-12 mt-2 mt-md-0 col-md-8'>
					<EditProfileForm
						firstname={firstname}
						lastname={lastname}
						email={email}
						username={username}
						setFirstname={setFirstname}
						setLastname={setLastname}
						setEmail={setEmail}
						setUsername={setUsername}
						saveChanges={saveChanges}
						loadUserInfo={loadUserInfo}
						currentSetting={currentSetting}
					/>
				</div>
			</div>
		</>
	);
};

export default withAuth(withFirebase(EditProfile));
