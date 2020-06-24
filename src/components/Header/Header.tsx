import React, { FC } from 'react';

import logo from '../../images/objectepisodes_logo.jpg';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import UserHeader from './components/UserHeader';
import { UserContextInterface } from '../Session/context';

interface Props extends RouteComponentProps {
	user: UserContextInterface | null;
}

const Header: FC<Props> = (props) => {
	const { user, history } = props;
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
								The #1 homepage for jugglers.
							</p>
						</a>
					</div>
					<div className='col-12 col-md-4 order-2 order-md-1 mb-md-0'>
						<UserHeader user={user} />
					</div>
				</div>
			</nav>
			{user?.data &&
				user?.data.admin &&
				history.location.pathname !== '/admin' && <AdminHeader />}
		</>
	);
};

export default withRouter(Header);
