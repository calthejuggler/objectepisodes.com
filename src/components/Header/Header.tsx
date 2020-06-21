import React, { useEffect, useState, FC } from 'react';

import logo from '../../images/objectepisodes_logo.jpg';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import UserHeader from './components/UserHeader';
import Firebase from './../Firebase/config';
import { withFirebase } from '../Firebase/context';
import { UserContextInterface } from '../Session/context';

interface Props extends RouteComponentProps {
	firebase: Firebase;
	user: UserContextInterface | null;
}

const Header: FC<Props> = (props) => {
	const { user, firebase, history } = props;
	const [userData, setUserData] = useState<null | { admin: boolean }>(null);
	const [error, setError] = useState<null | string>(null);
	useEffect(() => {
		if (user) {
			firebase.db
				.collection('users')
				.doc(user.auth.uid)
				.get()
				.then((userSnap: any) => {
					setUserData(userSnap.data());
				})
				.catch((e: { message: string }) => setError(e.message));
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
					<div className='col-12 col-md-4 order-2 order-md-1 mb-md-0'>
						<UserHeader user={user} userData={userData} />
					</div>
				</div>
			</nav>
			{userData &&
				userData.admin &&
				history.location.pathname !== '/admin' && <AdminHeader />}
			{error && (
				<div className='container-fluid'>
					<div className='alert alert-danger mb-2'>{error}</div>
				</div>
			)}
		</>
	);
};

export default withRouter(withFirebase(Header));
