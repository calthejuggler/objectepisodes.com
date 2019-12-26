import React from 'react';

import logo from '../../images/objectepisodes_logo.jpg';
import { withRouter } from 'react-router-dom';

const Header = props => {
	const { user } = props;
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
				{user ? (
					<div className="text-center">
						Logged in as <b>{user.displayName}</b><br/><button className="btn btn-link btn-sm" onClick={()=>{props.firebase.doSignOut()}}>Sign Out?</button>
					</div>
				) : (
					<>
						<div className='btn btn-primary' onClick={()=>props.history.push('/login')}>Login</div>
						<div className='btn btn-secondary' onClick={()=>props.history.push('/register')}>Register</div>
					</>
				)}
			</nav>
		</>
	);
};

export default withRouter(Header);
