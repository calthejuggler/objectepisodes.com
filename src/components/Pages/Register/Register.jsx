import React from 'react'
import { RegisterForm } from './components/RegisterForm'

export const Register = () => {
    return (
        <div className='row'>
			<div className='col-12 col-md-6 offset-md-3'>
				<div className='card'>
					<div className='card-body text-center'>
						<h3>Register</h3>
                        <RegisterForm/>
					</div>
				</div>
			</div>
		</div>
    )
}
