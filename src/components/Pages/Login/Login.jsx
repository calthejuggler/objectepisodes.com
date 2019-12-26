import React from 'react';
import LoginForm from './components/LoginForm';
import { FirebaseContext } from '../../Firebase';

export const Login = () => {
	return (
		<div className='row'>
			<div className='col-12 col-md-6 offset-md-3'>
				<div className='card'>
					<div className='card-body text-center'>
						<h3>Login</h3>
						<FirebaseContext.Consumer>
							{firebase => <LoginForm firebase={firebase} />}
						</FirebaseContext.Consumer>
					</div>
				</div>
			</div>
		</div>
	);
};
