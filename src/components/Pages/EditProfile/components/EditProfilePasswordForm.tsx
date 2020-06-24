import React, { useState, FC } from 'react';
import { withAuth } from '../../../Session/withAuth';
import { withFirebase } from '../../../Firebase/context';
import Firebase from './../../../Firebase/index';
import { UserContextInterface } from '../../../Session/context';

const EditProfilePasswordForm: FC<{
	firebase: Firebase;
	user: UserContextInterface;
}> = props => {
	const { firebase, user } = props;
	const [emailSent, setEmailSent] = useState(false);
	const [error, setError] = useState<null|string>(null);
	return (
		<>
			<hr />
			<div className='row align-items-center'>
				<div className='col h-100'>
					<p className='d-block m-auto'>
						Wish to change your password?
					</p>
				</div>
				<div className='col h-100'>
					<button
						className='btn btn-primary d-block m-auto'
						onClick={() =>
							firebase.auth
								.sendPasswordResetEmail(user.auth?.email)
								.then(() => setEmailSent(true))
								.catch((e: { message: string }) =>
									setError(e.message)
								)
						}
					>
						Click Here
					</button>
				</div>
			</div>
			{emailSent && (
				<div className='alert alert-success mt-2'>
					You have been sent a password reset email to {user.auth?.email}
				</div>
			)}
			{error && (
				<div className='alert alert-danger mt-2'>
					There was an error while sending your password reset email
				</div>
			)}
		</>
	);
};

export default withAuth(withFirebase(EditProfilePasswordForm));
