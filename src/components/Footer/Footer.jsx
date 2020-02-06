import React from 'react';
import DonateButton from './components/DonateButton';
import GiveFeedback from './components/GiveFeedback';
import PrivacyPolicy from './components/PrivacyPolicy';

export const Footer = () => {
	return (
		<footer className='bg-dark text-white text-center'>
			<div className='row align-items-center justify-content-center py-3 order-1'>
				<div className='col-4'>
					<ul className='navbar-nav'>
						<li>
							<PrivacyPolicy />
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
				<div className='col-12 col-md-2 order-3 order-md-2'>
					<ul className='navbar-nav text-white'>
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
							<DonateButton />
						</li>
					</ul>
				</div>
				<div className='col-4 order-2 order-md-3'>
					<ul className='navbar-nav'>
						<li>
							<a href='#/about' className='text-white'>
								About this Site
							</a>
						</li>
						<li>
							<GiveFeedback />
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
