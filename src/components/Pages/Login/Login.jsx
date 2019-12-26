import React from 'react';
import { LoginForm } from './components/LoginForm';

export const Login = () => {
	return (
		<div className='row'>
			<div className='col-6 offset-3'>
				<div className='card'>
					<div className='card-body text-center'>
						<h3>Login</h3>
						<LoginForm/>
					</div>
				</div>
			</div>
		</div>
	);
};
