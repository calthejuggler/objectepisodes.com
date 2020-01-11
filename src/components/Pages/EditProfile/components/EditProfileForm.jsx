import React from 'react';
import EditProfilePersonalForm from './EditProfilePersonalForm';
import EditProfilePasswordForm from './EditProfilePasswordForm';
import EditProfileButtons from './EditProfileButtons';

const EditProfileForm = props => {
	const {
		firstname,
		lastname,
		email,
		username,
		setUsername,
		setFirstname,
		setLastname,
		setEmail,
		saveChanges,
		loadUserInfo,
		currentSetting,
	} = props;
	return (
		<div className='card'>
			<div className='card-body'>
				<h4 className='card-title text-center'>{currentSetting}</h4>
				{currentSetting === 'Personal Information' && (
					<EditProfilePersonalForm
						firstname={firstname}
						lastname={lastname}
						email={email}
						setFirstname={setFirstname}
						setLastname={setLastname}
						setEmail={setEmail}
						username={username}
						setUsername={setUsername}
					/>
				)}
				{currentSetting === 'Password & Security' && (
					<EditProfilePasswordForm />
				)}
				{currentSetting !== 'Password & Security' && (
					<EditProfileButtons
						loadUserInfo={loadUserInfo}
						saveChanges={saveChanges}
					/>
				)}
			</div>
		</div>
	);
};

export default EditProfileForm;
