import React from 'react';

const DashNavigation = () => {
	return (
		<div className='card h-100 text-center'>
			<div className='card-body'>
				<h4 className='card-title'>Site Navigation</h4>
				<ul className='list-group'>
					<li className='list-group-item'>
						<a href='/'>Juggling Clubs (Coming Soon)</a>
					</li>
					<li className='list-group-item'>
						<a href='/'>Juggling Podcasts (Coming Soon)</a>
					</li>
					<li className='list-group-item'>
						<a href='/'>About This Website (Coming Soon)</a>
					</li>
					<li className='list-group-item'>
						<a href='/'>Juggling Events (Coming Soon)</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DashNavigation;
