import React, { useState, FC } from 'react';

import EditProfileNav from './components/EditProfileNav';
import PersonalForm from './components/PersonalForm';
import PasswordForm from './components/PasswordForm';

const EditProfile: FC = () => {
	const [currentSetting, setCurrentSetting] = useState<string>(
		'Personal Information'
	);

	return (
		<>
			<div className='row'>
				<div className='col-12 col-md-4'>
					<EditProfileNav setCurrentSetting={setCurrentSetting} />
				</div>
				<div className='col-12 mt-2 mt-md-0 col-md-8'>
					<div className='card'>
						<div className='card-body'>
							<h4 className='card-title text-center'>
								{currentSetting}
							</h4>
							{currentSetting === 'Personal Information' && (
								<PersonalForm />
							)}
							{currentSetting === 'Password & Security' && (
								<PasswordForm />
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
