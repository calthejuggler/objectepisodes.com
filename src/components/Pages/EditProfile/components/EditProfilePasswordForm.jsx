import React, { useState } from 'react';
import { withAuth } from '../../../Session/withAuth';
import { withFirebase } from '../../../Firebase/context';

const EditProfilePasswordForm = props => {
	const { firebase, user } = props;
	const [emailSent, setEmailSent] = useState(false);
	const [error, setError] = useState(null);
	return (
		<>
			<hr />
			<h5 className='text-center'>Account Details</h5>
			<div className='row align-items-center'>
				<div className='col'>
					<p>Wish to change your password?</p>
				</div>
				<div className='col'>
					<button
						className='btn btn-primary'
						onClick={() =>
							firebase.auth
								.sendPasswordResetEmail(user.email)
								.then(() => setEmailSent(true))
								.catch(e => setError(e.message))
						}>
						Click Here
					</button>
				</div>
			</div>
			{emailSent && (
				<div className='alert alert-success'>
					You have been sent a password reset email to {user.email}
				</div>
			)}
			{error && (
				<div className='alert alert-danger'>
					There was an error while sending your password reset email
				</div>
			)}
		</>
	);
};

export default withAuth(withFirebase(EditProfilePasswordForm));
