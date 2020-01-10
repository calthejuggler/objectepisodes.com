import React from 'react';

const EditProfileNav = props => {
	const { setCurrentSetting, currentSetting } = props;
	return (
		<div className='card'>
			<div className='card-body'>
				<h4 className='card-title text-center'>Edit Navigation</h4>
				<ul className='list-group'>
					<li
						className='list-group-item'
						onClick={() => setCurrentSetting('personal')}>
						Personal Information
					</li>
					<li
						className='list-group-item'
						onClick={() => setCurrentSetting('security')}>
						Password & Security
					</li>
				</ul>
			</div>
		</div>
	);
};

export default EditProfileNav;
