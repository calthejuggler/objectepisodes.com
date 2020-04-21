import React, { FC, useState } from 'react';

import { createAllRouteArray } from '../routes';
import { NavLink } from 'react-router-dom';

const SideNavBar: FC = () => {
	const [routes, setRoutes] = useState(createAllRouteArray());
	return (
		<ul className='list-group'>
			{routes.map(route =>
				route.hidden ? null : (
					<NavLink
						className='list-group-item list-group-item-action'
						activeClassName='active'
						exact
						key={route.name}
						to={route.path}
					>
						{route.name}
					</NavLink>
				)
			)}
		</ul>
	);
};

export default SideNavBar;
