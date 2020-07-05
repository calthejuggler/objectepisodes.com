import React, { FC, useEffect, useState } from 'react';

import logo from '../../images/objectepisodes_logo.jpg';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import UserHeader from './components/UserHeader';
import { UserContextInterface } from '../Session/context';
import Firebase from './../Firebase/config';
import { withFirebase } from '../Firebase/context';

interface Props extends RouteComponentProps {
	user: UserContextInterface;
	firebase: Firebase;
}

const Header: FC<Props> = (props) => {
	const { user, history, firebase } = props;
	const [userData, setUserData] = useState<firebase.firestore.DocumentData>();
	useEffect(() => {
		user &&
			firebase.db
				.collection('users')
				.doc(user.uid)
				.get()
				.then((res: firebase.firestore.DocumentSnapshot) => {
					res.exists && setUserData(res.data());
				});
	}, [user, firebase.db]);
	return (
		<>
			<nav className='navbar navbar-light d-block mt-2'>
				<div className='row align-items-center'>
					<div className='col-12 col-md-4 order-1 order-md-2'>
						<a href='/#/' className='navbar-brand d-block'>
							<img
								src={logo}
								alt='Object Episodes Logo'
								className='img-fluid d-block mx-auto'
								id='header-logo'
							/>
							<p className='text-center lead'>
								Critical Thinking about Juggling
							</p>
						</a>
					</div>
					<div className='col-12 col-md-4 order-2 order-md-1 mb-md-0'>
						<UserHeader userData={userData} />
					</div>
				</div>
			</nav>
			{userData &&
				userData.admin &&
				history.location.pathname !== '/admin' && <AdminHeader />}
		</>
	);
};

export default withRouter(withFirebase(Header));
