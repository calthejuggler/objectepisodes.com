import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const LoginForm = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const handleLoginSubmit = e => {
		e.preventDefault();
		props.firebase
			.doLoginWithEmailAndPassword(email, password)
			.then(user => {
				props.history.goBack();
			})
			.catch(e => {
				setError(e.message);
			});
	};
	return (
		<form className='text-left' onSubmit={handleLoginSubmit}>
			{error && <div className='alert alert-danger'>{error}</div>}
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
					<button
						className='btn btn-link btn-sm'
						onClick={e => props.history.push('/forgot')}>
						Forgot your password?
					</button>
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

export default withRouter(LoginForm);
