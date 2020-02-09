import React from 'react';

import routes from '../../../../routes';
import { NavLink } from 'react-router-dom';

const DashNavigation = () => {
	return (
		<ul className="list-group list-group-flush">
			{routes.map(route =>
				route.hidden ? null : route.inProgress ? (
					<li
						className='list-group-item'
						key={route.name}
						data-toggle='tooltip'
						data-placement='bottom'
						title='Coming Soon!'>
						<button
							type='button'
							className='btn btn-link nav-link disabled d-block mx-auto'>
							{route.name}
						</button>
					</li>
				) : (
					<li className='list-group-item' key={route.name}>
						<NavLink
							className='nav-link'
							activeClassName='active'
							exact
							to={route.path}>
							{route.name}
						</NavLink>
					</li>
				)
			)}
		</ul>
	);
};
export default DashNavigation;
