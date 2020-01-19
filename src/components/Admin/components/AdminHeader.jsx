import React from 'react';

const AdminHeader = props => {
	return (
		<nav className='navbar navbar-light bg-danger mb-3'>
			<div className='row'>
				<div className='col-12 text-white'>
					You are an Admin. <a href='#/admin'>Click here</a> for the
					admin page.
				</div>
			</div>
		</nav>
	);
};

export default AdminHeader;
