import React from 'react';

const AdminHeader = props => {
	return (
		<nav className='navbar navbar-light bg-danger mb-2'>
			<div className='row w-100 d-block'>
				<div className='col text-center text-white'>
					You are an Admin. <a href='#/admin'>Click here</a> for the
					admin page.
				</div>
			</div>
		</nav>
	);
};

export default AdminHeader;
