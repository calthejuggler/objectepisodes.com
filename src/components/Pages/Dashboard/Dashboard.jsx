import React from 'react';
import DashForum from './components/DashForum';
import DashRecords from './components/DashRecords/DashRecords';
import DashPOTD from './components/DashPOTD';
import DashEvent from './components/DashEvent';
import DashPanel from './components/DashPanel';

const Dashboard = () => {
	return (
		<>
			<div className='row'>
				<div className='col-12 col-md-4 pb-2 px-1'>
					<DashPanel
						title='Photo of the Day'
						btnTitle='See past POTDs'
						url='potd'>
						<DashPOTD />
					</DashPanel>
				</div>
				<div className='col-12 col-md-8 pb-2 px-1'>
					<DashPanel
						title='Top Forum Posts'
						btnTitle='Go to Forum'
						url='forum'>
						<DashForum />
					</DashPanel>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 col-md-6 pb-2 px-1'>
					<DashPanel
						title='Top Records'
						btnTitle='See all Records'
						url='record'>
						<DashRecords />
					</DashPanel>
				</div>
				<div className='col-12 col-md-6 pb-2 px-1'>
					<DashPanel
						title='Upcoming Event'
						btnTitle='See all Events'
						url='events'>
						<DashEvent />
					</DashPanel>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
