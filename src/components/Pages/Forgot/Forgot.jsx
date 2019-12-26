import React, { useState } from 'react';
import { withFirebase } from '../../Firebase/context';

const Forgot = props => {
	const [email, setEmail] = useState('');
	const [emailSent, setEmailSent] = useState(false);
	const [error, setError] = useState(null);
	const handlePasswordResetFormSubmit = e => {
		e.preventDefault();
		props.firebase
			.doSendForgotPasswordEmail(email)
			.then(res => {
				setEmailSent(true);
				setError(null);
			})
			.catch(e => {
				setError(e.message);
			});
	};
	return (
		<div className='row'>
			<div className='col'>
				<div className='card'>
					<div className='card-body'>
						<h3 className='text-center'>Password Reset</h3>
						{emailSent && (
							<div className='alert alert-success'>
								A password reset email has been sent to your
								email address.
							</div>
						)}
						{error && (
							<div className='alert alert-danger'>{error}</div>
						)}
						<form onSubmit={handlePasswordResetFormSubmit}>
							<div className='form-group'>
								<label htmlFor='email'>Email Address:</label>
								<input
									type='email'
									className='form-control'
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<input
								type='submit'
								value='Send Password Reset Email'
								className='btn btn-primary btn-sm d-block mx-auto'
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withFirebase(Forgot);
