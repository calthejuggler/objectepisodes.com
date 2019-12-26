import React from 'react';

import logo from '../../images/objectepisodes_logo.jpg';

export const Header = () => {
	return (
		<nav className='navbar navbar-light d-block'>
			<a href='/' className='navbar-brand d-block'>
				<img
					src={logo}
					alt='Object Episodes Logo'
					className='img-fluid d-block mx-auto'
                    id='header-logo'
				/>
			</a>
		</nav>
	);
};
