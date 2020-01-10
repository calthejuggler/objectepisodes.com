import React, { useState } from 'react';
import { withFirebase } from '../../../Firebase/context';

const EditProfilePersonalForm = props => {
	const {
		firstname,
		lastname,
		email,
		username,
		setFirstname,
		setLastname,
		setEmail,
		setUsername,
		firebase,
	} = props;

	const [usernameTaken, setUsernameTaken] = useState(false);
	const [usernameLoading, setUsernameLoading] = useState(false);
	return (
		<>
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
			<h5 className='text-center'>Account Details</h5>
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
				<div className='col-12'>
					<div className='form-group'>
						<label htmlFor='username'>Username:</label>
						<input
							type='text'
							className='form-control'
							value={username}
							onChange={e => {
								setUsername(e.target.value);
								setUsernameLoading(true);
								firebase.db
									.collection('users')
									.where('username', '==', e.target.value)
									.get()
									.then(ans => {
										setUsernameLoading(false);
										if (
											!ans.empty &&
											ans.docs[0].id !==
												firebase.auth.currentUser.uid
										) {
											setUsernameTaken(true);
										} else {
											setUsernameTaken(false);
										}
									});
							}}
						/>
						{usernameTaken && (
							<div className='alert alert-danger'>
								This username is taken.
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default withFirebase(EditProfilePersonalForm);
