import React, { useEffect, useState } from 'react';

import logo from '../../images/objectepisodes_logo.jpg';
import { withRouter } from 'react-router-dom';
import HeaderHFOTD from './components/HeaderHFOTD';
import AdminHeader from './components/AdminHeader';
import ProfilePicture from '../elements/ProfilePicture';

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
				})
				.catch(e => console.dir(e.message));
		}
		return () => {};
	}, [firebase.db, user]);
	return (
		<>
			<nav className='navbar navbar-light d-block mt-1'>
				<div className='row align-items-center'>
					<div className='col-12 col-md-4 order-1 order-md-2'>
						<a href='/' className='navbar-brand d-block'>
							<img
								src={logo}
								alt='Object Episodes Logo'
								className='img-fluid d-block mx-auto'
								id='header-logo'
							/>
						</a>
					</div>
					<div className='col-12 col-md-4 order-2 order-md-1'>
						{user && userData ? (
							<div className='text-center'>
								<ProfilePicture
									userID={user.uid}
									size={['5rem', '5rem']}
								/>
								<p>
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
								</p>
							</div>
						) : (
							<div className='d-flex justify-content-center'>
								<div
									className='btn btn-primary mr-3'
									onClick={() =>
										props.history.push('/login')
									}>
									Login
								</div>
								<div
									className='btn btn-secondary ml-3'
									onClick={() =>
										props.history.push('/register')
									}>
									Register
								</div>
							</div>
						)}
					</div>
					<div className='col-12 col-md-4 order-3 order-md-3'>
						<HeaderHFOTD />
					</div>
				</div>
			</nav>
			{userData && userData.admin && <AdminHeader />}
		</>
	);
};

export default withRouter(Header);
