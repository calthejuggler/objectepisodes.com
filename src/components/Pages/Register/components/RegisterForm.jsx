import React, { useState } from 'react';

export const RegisterForm = props => {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [error, setError] = useState(null);

	const [registered, setRegistered] = useState(false);

	const handleRegisterSubmit = e => {
		e.preventDefault();
		if (
			firstname === '' ||
			lastname === '' ||
			username === '' ||
			email === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			setError('All fields are required!');
		} else if (password !== confirmPassword) {
			setError('Passwords do not match!');
		} else {
			props.firebase
				.doRegisterWithEmailAndPassword(email, password, firstname, lastname, username)
				.then(res => {
					setError(null);
					setRegistered(true);
				})
				.catch(e => {
					setError(e.message);
				});
		}
	};

	return (
		<form className='text-left' onSubmit={handleRegisterSubmit}>
			{error && <div className='alert alert-danger'>{error}</div>}
			{registered && (
				<div className='alert alert-success'>
					You have successfully registered!
				</div>
			)}
			<div className='form-group'>
				<label htmlFor='name'>Firstname:</label>
				<input
					type='text'
					name='name'
					className='form-control'
					value={firstname}
					onChange={e => setFirstname(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='name'>Lastname:</label>
				<input
					type='text'
					name='name'
					className='form-control'
					value={lastname}
					onChange={e => setLastname(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='name'>Username:</label>
				<input
					type='text'
					name='name'
					className='form-control'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='email'>Email:</label>
				<input
					type='email'
					className='form-control'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					className='form-control'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='password'>Confirm Password:</label>
				<input
					type='password'
					className='form-control'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
			</div>
			<input
				type='submit'
				value='Submit'
				className='btn btn-primary d-block mx-auto'
			/>
		</form>
	);
};
