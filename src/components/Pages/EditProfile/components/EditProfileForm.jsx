import React from 'react';
import EditProfilePersonalForm from './EditProfilePersonalForm';

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
				<div className='row'>
					<div className='col-6'>
						<button
							type='submit'
							className='btn btn-secondary d-block ml-auto'
							onClick={loadUserInfo}>
							Cancel
						</button>
					</div>
					<div className='col-6'>
						<button
							type='submit'
							className='btn btn-primary d-block mr-auto'
							onClick={saveChanges}>
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfileForm;
