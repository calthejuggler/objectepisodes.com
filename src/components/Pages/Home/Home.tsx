import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='row align-items-center justify-content-center text-center h-100'>
			<div className='col-12 col-md-6 p-5 h-auto'>
				<Link to='/database'className='display-4'>Database</Link>
			</div>
			<div className='col-12 col-md-6 p-5 h-auto'>
				<Link to='/forum'className='display-4'>Forum</Link>
			</div>
		</div>
	);
};

export default Home;
