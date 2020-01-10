import React, { useState } from 'react';

const EditProfile = props => {
	const [currentSetting, setCurrentSetting] = useState('personal');

	return (
		<div className='row'>
			<div className='col-4'>
				<div className='card'>
					<div className='card-body'>
						<h4 className='card-title text-center'>
							Edit Navigation
						</h4>
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
			</div>
			<div className='col-8'>
				<div className='card'>
					<div className='card-body'>
						<h4 className='card-title text-center'>
							Personal Information
						</h4>
						<hr />
						<h5 className='text-center'>Profile Picture</h5>
						<div className='row align-items-center'>
							<div className='col-6'>
								<img
									src='https://via.placeholder.com/150x150'
									alt='Profile pic placeholder'
									className='rounded-circle d-block mx-auto'
								/>
							</div>
							<div className='col-6'>
								<div className='form-group'>
									<label htmlFor='profilepic'>
										Upload Image
									</label>
									<input
										type='file'
										name='profilepic'
										id='profilePic'
										className='form-control-file'
									/>
								</div>
							</div>
						</div>
						<hr />
						<div className='row'>
							<div className='col'>
								<div className='form-group'>
									<label htmlFor='firstname'>
										First Name:
									</label>
									<input
										type='text'
										className='form-control'
									/>
								</div>
							</div>
							<div className='col'>
								<div className='form-group'>
									<label htmlFor='lastname'>Last Name:</label>
									<input
										type='text'
										className='form-control'
									/>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-12'>
								<div className='form-group'>
									<label htmlFor='email'>
										Email Address:
									</label>
									<input
										type='email'
										name='email'
										id='email'
										className='form-control'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
