import React, { useEffect, useState } from 'react';

import logo from '../../images/objectepisodes_logo.jpg';
import { withRouter } from 'react-router-dom';
import HeaderHFOTD from './components/HeaderHFOTD';
import AdminHeader from './components/AdminHeader';
import UserHeader from './components/UserHeader';
import Navigation from './components/Navigation';

const Header = props => {
	const { user, firebase } = props;
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);
	useEffect(() => {
		if (user) {
			firebase.db
				.collection('users')
				.doc(user.uid)
				.get()
				.then(userSnap => {
					setUserData(userSnap.data());
				})
				.catch(e => setError(e.message));
		}
		return () => {};
	}, [firebase.db, user]);
	return (
		<>
			<nav className='navbar navbar-light d-block mt-2'>
				<div className='row align-items-center'>
					<div className='col-12 col-md-4 order-1 order-md-2'>
						<a href='/' className='navbar-brand d-block'>
							<img
								src={logo}
								alt='Object Episodes Logo'
								className='img-fluid d-block mx-auto'
								id='header-logo'
							/>
							<p className='text-center lead'>
								The #1 homepage for jugglers.
							</p>
						</a>
					</div>
					<div className='col-12 col-md-4 order-2 order-md-1 mb-4 mb-md-0'>
						<UserHeader user={user} userData={userData} />
					</div>
					<div className='col-12 col-md-4 order-3 order-md-3'>
						<HeaderHFOTD />
					</div>
					<div className='col-12 d-lg-none order-4'>
						<Navigation />
					</div>
				</div>
			</nav>
			{userData && userData.admin && <AdminHeader />}
			{error && (
				<div className='container-fluid'>
					<div className='alert alert-danger mb-2'>{error}</div>
				</div>
			)}
		</>
	);
};

export default withRouter(Header);
