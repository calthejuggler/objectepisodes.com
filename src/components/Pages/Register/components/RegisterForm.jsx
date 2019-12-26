import React, { useState } from 'react';

export const RegisterForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	return (
		<form className='text-left'>
			<div className='form-group'>
				<label htmlFor='name'>Name:</label>
				<input
					type='text'
					name='name'
					className='form-control'
					value={name}
					onChange={e => setName(e.target.value)}
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
