import React from 'react';

export const Footer = () => {
	return (
		<footer className='bg-secondary text-white text-center'>
			<div className='row align-items-center justify-content-center'>
				<div className='col-6'>
					<ul className='navbar-nav'>
						<li>
							<a href='' className='text-white'>
								Privacy Policy
							</a>
						</li>
						<li>
							<a href='' className='text-white'>
								Terms of Service
							</a>
						</li>
						<li>
							<a href='' className='text-white'>
								Sitemap
							</a>
						</li>
					</ul>
				</div>
				<div className='col-6'>
					<ul className='navbar-nav'>
						<li>
							<button className='btn btn-primary'>Donate</button>
						</li>
						<li>
							<a href='' className='text-white'>
								About this Site
							</a>
						</li>
						<li></li>
					</ul>
				</div>
			</div>
		</footer>
	);
};
