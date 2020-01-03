import React, { useEffect, useState } from 'react';

import logo from '../../images/objectepisodes_logo.jpg';
import { withRouter } from 'react-router-dom';

const Header = props => {
	const { user, firebase } = props;
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		if (user) {
			firebase.db
				.collection('users')
				.doc(user.uid)
				.get()
				.then(userSnap => {
					setUserData(userSnap.data());
				});
		}
		return () => {};
	});
	return (
		<>
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
			<nav className='navbar navbar-light d-block'>
				{userData ? (
					<div className='text-center'>
						Logged in as{' '}
						<a href={'#/user/' + userData.username}>
							{user.displayName}
						</a>
						<br />
						<button
							className='btn btn-link btn-sm'
							onClick={() => {
								props.firebase.doSignOut();
							}}>
							Sign Out?
						</button>
					</div>
				) : (
					<div className='d-flex justify-content-center'>
						<div
							className='btn btn-primary mr-3'
							onClick={() => props.history.push('/login')}>
							Login
						</div>
						<div
							className='btn btn-secondary ml-3'
							onClick={() => props.history.push('/register')}>
							Register
						</div>
					</div>
				)}
			</nav>
		</>
	);
};

export default withRouter(Header);
