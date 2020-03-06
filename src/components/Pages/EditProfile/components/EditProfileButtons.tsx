import React, { FC } from 'react';

const EditProfileButtons: FC<{
	loadUserInfo: any;
	saveChanges: any;
}> = props => {
	const { loadUserInfo, saveChanges } = props;
	return (
		<div className='row'>
			<div className='col-6'>
				<button
					type='submit'
					className='btn btn-secondary d-block ml-auto'
					onClick={loadUserInfo}
				>
					Cancel
				</button>
			</div>
			<div className='col-6'>
				<button
					type='submit'
					className='btn btn-primary d-block mr-auto'
					onClick={saveChanges}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
};

export default EditProfileButtons;
