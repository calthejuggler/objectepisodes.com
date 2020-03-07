import React, { useState, FormEvent, FC } from 'react';
import Firebase from './../../../Firebase/index';
import { withFirebase } from '../../../Firebase/context';

const RegisterForm: FC<{ firebase: Firebase }> = props => {
	const [firstname, setFirstname] = useState<string>('');
	const [lastname, setLastname] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const [error, setError] = useState<null | string>(null);

	const [registered, setRegistered] = useState<boolean>(false);

	const handleRegisterSubmit = (e: FormEvent) => {
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
				.doRegisterWithEmailAndPassword(
					email,
					password,
					firstname,
					lastname,
					username
				)
				.then(() => {
					setError(null);
					setRegistered(true);
				})
				.catch((e: { message: string }) => {
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

export default withFirebase(RegisterForm);
