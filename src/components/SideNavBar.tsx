import React from 'react';

import routes from '../routes';
import { NavLink } from 'react-router-dom';

const SideNavBar = props => {
	return (
		<ul className='list-group'>
			{routes.map(route =>
				route.hidden ? null : route.inProgress ? (
					<li
						className='list-group-item list-group-item-action disabled text-left'
						key={route.name}
						data-toggle='tooltip'
						data-placement='bottom'
						title='Coming Soon!'>{route.name}
					</li>
				) : (
					<NavLink
						className='list-group-item list-group-item-action'
						activeClassName='active'
						exact
						key={route.name}
						to={route.path}>
						{route.name}
					</NavLink>
				)
			)}
		</ul>
	);
};

export default SideNavBar;
