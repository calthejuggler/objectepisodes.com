import React, { useState } from 'react';

import { createAllRouteArray } from '../../../routes';

const Navigation = () => {
	const [routes, setRoutes] = useState<
		Array<{ hidden: boolean; name: string }>
	>(createAllRouteArray());
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<button
				className='navbar-toggler ml-auto'
				type='button'
				data-toggle='collapse'
				data-target='#mainNav'
				aria-controls='mainNav'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='mainNav'>
				<ul className='navbar-nav mx-auto'>
					{routes.map(route =>
						route.hidden ? null : (
							<li
								className='nav-item'
								key={route.name}
								data-toggle='tooltip'
								data-placement='bottom'
								title='Coming Soon!'
							>
								<button
									type='button'
									className='btn btn-link nav-link disabled'
								>
									{route.name}
								</button>
							</li>
						)
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navigation;
