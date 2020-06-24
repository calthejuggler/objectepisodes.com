import React, { FC, Dispatch } from 'react';
import Spinner from '../../../../elements/Spinner';

const Step4: FC<{
	dispatch: Dispatch<{ type: string; payload?: any }>;
	state: {
		firstname: string;
		lastname: string;
		email: string;
		username: string;
		loading: boolean;
	};
}> = ({ dispatch, state }) => {
	const { firstname, lastname, email, username, loading } = state;
	return (
		<>
			<ul className='list-group-flush list-group'>
				<li className='list-group-item'>
					<b>Name:</b> {firstname} {lastname}
				</li>
				<li className='list-group-item'>
					<b>Email:</b> {email}
				</li>
				<li className='list-group-item'>
					<b>Username:</b> {username}
				</li>
			</ul>
			{loading && <Spinner>Creating your account...</Spinner>}
		</>
	);
};

export default Step4;
