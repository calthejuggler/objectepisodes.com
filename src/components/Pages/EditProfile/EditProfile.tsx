import React, { useState, useEffect, useCallback, FC, FormEvent } from 'react';

import { withFirebase } from '../../Firebase/context';

import EditProfileNav from './components/EditProfileNav';
import { withAuth } from '../../Session/withAuth';
import EditProfileForm from './components/EditProfileForm';
import Firebase from './../../Firebase/index';

const EditProfile: FC<{ firebase: Firebase; user: any }> = props => {
	const { firebase, user } = props;
	const [currentSetting, setCurrentSetting] = useState<string>(
		'Personal Information'
	);

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');

	const [error, setError] = useState<null | string>(null);

	const saveChanges = (e: FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			firebase.db
				.collection('users')
				.doc(user.uid)
				.update({
					firstname: firstname,
					lastname: lastname,
					email: email,
					username: username
				});
		}
	};

	const validateForm:CallableFunction = () => {
		let currentUID = user.uid;
		let newUsernameUID = '';
		let usernameTaken = false;
		firebase.db
			.collection('users')
			.where('username', '==', username)
			.get()
			.then((docsRef: any) => {
				newUsernameUID = docsRef.docs[0].id;
				if (docsRef.empty) {
					usernameTaken = false;
				} else if (newUsernameUID === currentUID) {
					usernameTaken = false;
				} else {
					usernameTaken = true;
				}
				if (firstname === '' || lastname === '') {
					setError('You must have both a firstname and a lastname.');
					return false;
				} else if (
					/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
						email
					) === false
				) {
					setError('The email address you provided is invalid.');
					return false;
				} else if (usernameTaken === true) {
					setError('Please choose a different username.');
					return false;
				} else {
					setError(null);
					return true;
				}
			});
	};

	const loadUserInfo = useCallback(
		(e?: FormEvent) => {
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
