import React from 'react';

const EditProfilePersonalForm = props => {
	const {
		firstname,
		lastname,
		email,
		setFirstname,
		setLastname,
		setEmail,
		saveChanges,
		loadUserInfo,
	} = props;
	return (
		<div className='card'>
			<div className='card-body'>
				<h4 className='card-title text-center'>Personal Information</h4>
				<hr />
				<h5 className='text-center'>Profile Picture</h5>
				<div className='row align-items-center'>
					<div className='col-12 col-md-4'>
						<img
							src='https://via.placeholder.com/75x75'
							alt='Profile pic placeholder'
							className='rounded-circle d-block mx-auto'
						/>
					</div>
					<div className='col-12 col-md-8'>
						<div className='form-group'>
							<label htmlFor='profilepic'>Upload Image</label>
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
							<label htmlFor='firstname'>First Name:</label>
							<input
								type='text'
								value={firstname}
								onChange={e => setFirstname(e.target.value)}
								className='form-control'
							/>
						</div>
					</div>
					<div className='col'>
						<div className='form-group'>
							<label htmlFor='lastname'>Last Name:</label>
							<input
								type='text'
								value={lastname}
								onChange={e => setLastname(e.target.value)}
								className='form-control'
							/>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<div className='form-group'>
							<label htmlFor='email'>Email Address:</label>
							<input
								type='email'
								name='email'
								id='email'
								className='form-control'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-6'>
						<button
							type='submit'
							className='btn btn-secondary'
							onClick={loadUserInfo}>
							Cancel
						</button>
					</div>
					<div className='col-6'>
						<button
							type='submit'
							className='btn btn-primary'
							onClick={saveChanges}>
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfilePersonalForm;
