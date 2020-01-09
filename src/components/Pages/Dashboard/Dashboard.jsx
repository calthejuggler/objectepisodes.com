import React from 'react';
import DashForum from './components/DashForum';
import DashRecords from './components/DashRecords';
import DashPOTD from './components/DashPOTD';

const Dashboard = () => {
	return (
		<>
			<div className='row'>
				<div className='col-12 col-md-4'>
					<DashForum />
				</div>
				<div className="col-12 col-md-6">
					<DashPOTD />
				</div>
			</div>
			<div className='row'>
				<div className='col-12 col-md-4'>
					<DashRecords />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
