import React, { FC, Dispatch } from 'react';

const Step1: FC<{
	dispatch: Dispatch<{ type: string; payload?: any }>;
	state: { password: string; confirmPassword: string };
}> = ({ dispatch, state }) => {
	const { password, confirmPassword } = state;
	return (
		<>
			<div className='form-group'>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					placeholder='Enter your password...'
					className='form-control'
					onChange={(e) =>
						dispatch({
							type: 'change-field',
							payload: {
								field: 'password',
								value: e.currentTarget.value,
							},
						})
					}
					value={password}
					required
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='confirmPassword'>Confirm Password</label>
				<input
					type='password'
					name='confirmPassword'
					placeholder='Confirm your password...'
					className='form-control'
					onChange={(e) =>
						dispatch({
							type: 'change-field',
							payload: {
								field: 'confirmPassword',
								value: e.currentTarget.value,
							},
						})
					}
					value={confirmPassword}
					required
				/>
			</div>
		</>
	);
};

export default Step1;
