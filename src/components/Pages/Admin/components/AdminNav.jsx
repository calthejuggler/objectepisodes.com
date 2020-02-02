import React from 'react';

const AdminNav = props => {
	const { setNavChoice } = props;
	return (
		<ul className='list-group'>
			<li
				className='list-group-item'
				onClick={() => setNavChoice('hfotd')}>
				Historical fact of the day
			</li>
			<li
				className='list-group-item'
				onClick={() => setNavChoice('potd')}>
				Photo of the day
			</li>
			<li
				className='list-group-item'
				onClick={() => setNavChoice('users')}>
				Users
			</li>
		</ul>
	);
};

export default AdminNav;
