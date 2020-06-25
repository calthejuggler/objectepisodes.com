import React, { useState, useEffect, useCallback, FC, FormEvent } from 'react';

import { withFirebase } from '../../Firebase/context';

import EditProfileNav from './components/EditProfileNav';
import { withAuth } from '../../Session/withAuth';
import EditProfileForm from './components/EditProfileForm';
import Firebase from './../../Firebase/index';
import { UserContextInterface } from '../../Session/context';

const EditProfile: FC<{ firebase: Firebase; user: UserContextInterface }> = (
	props
) => {
	const { firebase, user } = props;
	const [currentSetting, setCurrentSetting] = useState<string>(
		'Personal Information'
	);

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');

	const [error, setError] = useState<null | string>(null);

	const saveChanges = (e: FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			firebase.db.collection('users').doc(user?.uid).update({
				firstname: firstname,
				lastname: lastname,
				email: email,
			});
		}
	};

	const validateForm: CallableFunction = () => {
		if (firstname === '' || lastname === '') {
			setError('You must have both a firstname and a lastname.');
			return false;
		} else if (
			/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
		) {
			setError('The email address you provided is invalid.');
			return false;
		} else {
			setError(null);
			return true;
		}
	};

	const loadUserInfo = useCallback(
		(e?: FormEvent) => {
			if (e) e.preventDefault();
			if (user) {
				firebase.getUserDataFromUID(user?.uid).then((userSnap) => {
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
					<EditProfileNav setCurrentSetting={setCurrentSetting} />
				</div>
				<div className='col-12 mt-2 mt-md-0 col-md-8'>
					<EditProfileForm
						firstname={firstname}
						lastname={lastname}
						email={email}
						setFirstname={setFirstname}
						setLastname={setLastname}
						setEmail={setEmail}
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
