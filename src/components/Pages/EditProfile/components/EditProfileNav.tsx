import React, { FC, SetStateAction, Dispatch } from 'react';

const EditProfileNav: FC<{
	setCurrentSetting: Dispatch<SetStateAction<string>>;
	
}> = props => {
	const { setCurrentSetting } = props;
	return (
		<div className='card'>
			<div className='card-body'>
				<h4 className='card-title text-center'>Edit Navigation</h4>
				<ul className='list-group'>
					<li
						className='list-group-item'
						onClick={() =>
							setCurrentSetting('Personal Information')
						}
					>
						Personal Information
					</li>
					<li
						className='list-group-item'
						onClick={() => setCurrentSetting('Password & Security')}
					>
						Password & Security
					</li>
				</ul>
			</div>
		</div>
	);
};

export default EditProfileNav;
