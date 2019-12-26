import React, { useState } from 'react';

export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleLoginSubmit = e => {
		e.preventDefault();
	};
	return (
		<form className='text-left' onSubmit={handleLoginSubmit}>
			<a href='/register' className='mx-auto d-block mt-3 text-center'>
				Don't have an account? Register here.
			</a>
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
				<small className='ml-auto'>
					<a href='/forgot'>Forgot your password?</a>
				</small>
			</div>
			<input
				type='submit'
				value='Submit'
				className='btn btn-primary d-block mx-auto'
			/>
		</form>
	);
};
