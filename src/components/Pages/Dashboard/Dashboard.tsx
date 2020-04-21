import React from 'react';
import DashForum from './components/DashForum';
import DashPOTD from './components/DashPOTD';
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
		</>
	);
};

export default Dashboard;
