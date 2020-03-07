import React from 'react';
import LoginForm from './components/LoginForm';
import { FirebaseContext } from '../../Firebase';
import Firebase from './../../Firebase/index';

export const Login = () => {
	return (
		<div className='row'>
			<div className='col-12 col-md-6 offset-md-3'>
				<div className='card'>
					<div className='card-body text-center'>
						<h3>Login</h3>
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
};
