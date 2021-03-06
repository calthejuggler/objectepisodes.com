import React from 'react';

const AdminHeader = () => {
	return (
		<nav className='navbar navbar-light bg-danger'>
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
