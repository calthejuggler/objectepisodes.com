import React from 'react';

export const Footer = () => {
	return (
		<footer className='bg-dark text-white text-center'>
			<div className='row align-items-center justify-content-center py-3'>
				<div className='col-4'>
					<ul className='navbar-nav'>
						<li>
							<button
								className='btn btn-link'
								type='button'
								disabled>
								Privacy Policy
							</button>
						</li>
						<li>
							<button
								className='btn btn-link'
								type='button'
								disabled>
								Terms of Service
							</button>
						</li>
						<li>
							<button
								className='btn btn-link'
								type='button'
								disabled>
								Sitemap
							</button>
						</li>
					</ul>
				</div>
				<div className='col-4'>
					<ul className='navbar-nav text-muted'>
						<li>
							Consider donating to support objectepisodes.com!
						</li>
						<li>
							<small>
								It costs 12.99EUR/month to run this website.
								<br />
								Wanna buy a round?
							</small>
						</li>
						<li>
							<button disabled className='btn btn-disabled mt-2'>
								Donate
							</button>
						</li>
					</ul>
				</div>
				<div className='col-4'>
					<ul className='navbar-nav'>
						<li>
							<button
								className='btn btn-link'
								type='button'
								disabled>
								About this Site
							</button>
						</li>
						<li>
							<button
								className='btn btn-link'
								type='button'
								disabled>
								Give Feedback
							</button>
						</li>
						<li>
							<button
								className='btn btn-link'
								type='button'
								disabled>
								Want to Help?
							</button>
						</li>
						<li>
							<button
								className='btn btn-link'
								type='button'
								disabled>
								Report a Bug
							</button>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};
