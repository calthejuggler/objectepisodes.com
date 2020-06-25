import React, { FC, SetStateAction, Dispatch } from 'react';
import EditProfilePersonalForm from './EditProfilePersonalForm';
import EditProfilePasswordForm from './EditProfilePasswordForm';
import EditProfileButtons from './EditProfileButtons';

interface Props {
	firstname: string;
	lastname: string;
	email: string;
	setFirstname: Dispatch<SetStateAction<string>>;
	setLastname: Dispatch<SetStateAction<string>>;
	setEmail: Dispatch<SetStateAction<string>>;
	saveChanges: any;
	loadUserInfo: any;
	currentSetting: string;
}

const EditProfileForm: FC<Props> = props => {
	const {
		firstname,
		lastname,
		email,
		setFirstname,
		setLastname,
		setEmail,
		saveChanges,
		loadUserInfo,
		currentSetting
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
