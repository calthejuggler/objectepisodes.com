import React, { FC, Dispatch } from 'react';

const Step2: FC<{
	dispatch: Dispatch<{ type: string; payload?: any }>;
	state: { firstname: string; lastname: string; username: string };
}> = ({ dispatch, state }) => {
	const { firstname, lastname, username } = state;
	return (
		<>
			<div className='form-group'>
				<label htmlFor='firstname'>First Name</label>
				<input
					type='text'
					name='firstname'
					placeholder='Enter your first name...'
					className='form-control'
					onChange={(e) =>
						dispatch({
							type: 'change-field',
							payload: {
								field: 'firstname',
								value: e.currentTarget.value,
							},
						})
					}
					value={firstname}
					required
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='firstname'>Last Name</label>
				<input
					type='text'
					name='lastname'
					placeholder='Enter your last name...'
					className='form-control'
					onChange={(e) =>
						dispatch({
							type: 'change-field',
							payload: {
								field: 'lastname',
								value: e.currentTarget.value,
							},
						})
					}
					value={lastname}
					required
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='firstname'>Username</label>
				<input
					type='text'
					name='username'
					placeholder='Enter your username...'
					className='form-control'
					onChange={(e) =>
						dispatch({
							type: 'change-field',
							payload: {
								field: 'username',
								value: e.currentTarget.value,
							},
						})
					}
					value={username}
					required
				/>
				<small>*This will be used for your profile's URL</small>
			</div>
		</>
	);
};

export default Step2;
