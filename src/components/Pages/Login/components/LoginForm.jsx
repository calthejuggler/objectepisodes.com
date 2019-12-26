import React from 'react';

export const LoginForm = () => {
	return (
		<form className='text-left'>
			<a href='/register' className='mx-auto d-block mt-3 text-center'>
				Don't have an account? Register here.
			</a>
			<div className='form-group'>
				<label htmlFor='email'>Email:</label>
				<input type='email' className='form-control' />
			</div>
			<div className='form-group'>
				<label htmlFor='password'>Password:</label>
				<input type='password' className='form-control' />
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
