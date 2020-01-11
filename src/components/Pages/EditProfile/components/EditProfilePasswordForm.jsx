import React from 'react';

const EditProfilePasswordForm = props => {
	const { password, setPassword, confirmPassword, setConfirmPassword } = props;
	return (
		<>
			<hr />
			<h5 className='text-center'>Account Details</h5>
			<div className='row'>
				<div className='col'>
					<div className='form-group'>
						<label htmlFor='firstname'>Password:</label>
						<input
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='form-control'
						/>
					</div>
				</div>
				<div className='col'>
					<div className='form-group'>
						<label htmlFor='firstname'>Confirm Password:</label>
						<input
							type='password'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							className='form-control'
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfilePasswordForm;
