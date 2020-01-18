import React from 'react';
import DashForum from './components/DashForum';
import DashRecords from './components/DashRecords/DashRecords';
import DashPOTD from './components/DashPOTD';
import DashNavigation from './components/DashNavigation';
import DashEvent from './components/DashEvent';

const Dashboard = () => {
	return (
		<>
			<div className='row my-3'>
				<div className='col-12 col-md-4'>
					<DashPOTD />
				</div>
				<div className='col-12 col-md-8'>
					<DashForum />
				</div>
			</div>
			<div className='row my-3'>
				<div className='col-12 col-md-4'>
					<DashRecords />
				</div>
				<div className='col-12 col-md-4'>
					<DashEvent />
				</div>
				<div className='col-12 col-md-4'>
					<DashNavigation />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
