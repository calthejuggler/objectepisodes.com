import React, { FC } from 'react';
import DonateButton from './components/DonateButton';
import GiveFeedback from './components/GiveFeedback';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

export const Footer:FC = () => {
	return (
		<footer className='bg-dark text-white text-center py-5'>
			<div className='row align-items-center justify-content-center'>
				<div className='col-12 col-sm-6 col-lg-5 order-1'>
					<ul className='navbar-nav'>
						<li>
							<PrivacyPolicy />
						</li>
						<li>
							<TermsOfService />
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
				<div className='col-12 col-sm-6 col-lg-2 order-3 order-sm-2 pt-3'>
					<hr className='bg-white d-sm-none w-25' />
					<ul className='navbar-nav text-white'>
						<li>
							Consider donating to support
							<br />
							objectepisodes.com!
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
				<div className='col-12 col-sm-6 col-lg-5 order-2 order-sm-3 mr-auto'>
					<hr className='bg-white d-none d-sm-block d-lg-none w-25' />
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
