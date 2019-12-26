import React from 'react';
import { RegisterForm } from './components/RegisterForm';
import { FirebaseContext } from '../../Firebase';

export const Register = () => {
	return (
		<div className='row'>
			<div className='col-12 col-md-6 offset-md-3'>
				<div className='card'>
					<div className='card-body text-center'>
						<h3>Register</h3>
						<FirebaseContext.Consumer>
							{firebase => <RegisterForm firebase={firebase} />}
						</FirebaseContext.Consumer>
					</div>
				</div>
			</div>
		</div>
	);
};
