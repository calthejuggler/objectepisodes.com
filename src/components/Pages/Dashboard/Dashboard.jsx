import React from 'react';
import DashForum from './components/DashForum';
import DashRecords from './components/DashRecords';
import DashPOTD from './components/DashPOTD';
import DashHFOTD from './components/DashHFOTD';
import DashNavigation from './components/DashNavigation';

const Dashboard = () => {
	return (
		<>
			<div className='row'>
				<div className='col-12 col-md-4'>
					<DashForum />
				</div>
				<div className='col-12 col-md-5'>
					<DashPOTD />
				</div>
				<div className='col-12 col-md-3'>
					<DashHFOTD />
				</div>
			</div>
			<div className='row'>
				<div className='col-12 col-md-4'>
					<DashRecords />
				</div>
				<div className='col-12 col-md-8'>
					<DashNavigation />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
