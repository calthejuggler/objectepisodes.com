import React, { FC, Dispatch } from 'react';

const Step0: FC<{
	dispatch: Dispatch<{ type: 'change-field'; payload: any }>;
	state: { email: string };
}> = ({ dispatch, state }) => {
	const { email } = state;
	return (
		<div className='form-group'>
			<label htmlFor='email'>
				Please enter your email address to sign up:
			</label>
			<input
				type='email'
				name='email'
				placeholder='Email Address...'
				className='form-control'
				onChange={(e) =>
					dispatch({
						type: 'change-field',
						payload: {
							field: 'email',
							value: e.currentTarget.value,
						},
					})
				}
				value={email}
				required
			/>
		</div>
	);
};

export default Step0;
