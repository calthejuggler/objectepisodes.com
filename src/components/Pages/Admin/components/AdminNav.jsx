import React from 'react';

const AdminNav = props => {
	const { setNavChoice } = props;
	return (
		<ul className='list-group'>
			<li className='list-group-item'>Historical fact of the day</li>
			<li className='list-group-item'>Photo of the day</li>
			<li className='list-group-item'>Users</li>
		</ul>
	);
};

export default AdminNav;
