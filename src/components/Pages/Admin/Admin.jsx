import React, { useState } from 'react';
import AddHFOTD from './components/AddHFOTD';
import ListHFOTD from './components/ListHFOTD';
import AdminNav from './components/AdminNav';

const Admin = () => {
	const [navChoice, setNavChoice] = useState('hfotd');
	return (
		<>
			<div className='row'>
				<div className='col-12 col-md-3'>
					<div className='card'>
						<div className='card-body'>
							<AdminNav setNavChoice={setNavChoice} />
						</div>
					</div>
				</div>
				{navChoice === 'hfotd' && (
					<div className='col-12 col-md-9'>
						<div className='card'>
							<div className='card-body'>
								<AddHFOTD />
							</div>
						</div>
					</div>
				)}
				<div className='col-12 mt-3'>
					<div className='card'>
						<div className='card-body'>
							<ListHFOTD />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Admin;
