import React, { useState } from 'react';
import AddHFOTD from './components/AddHFOTD';
import ListHFOTD from './components/ListHFOTD';
import AdminNav from './components/AdminNav';
import AddPOTD from './components/AddPOTD';
import ListPOTD from './components/ListPOTD';
import AdminUsers from './components/AdminUsers';

const Admin = () => {
	const [navChoice, setNavChoice] = useState<string>('users');
	return (
		<>
			<div className='row mt-3'>
				<div className='col-12 col-md-3'>
					<AdminNav
						setNavChoice={setNavChoice}
						navChoice={navChoice}
					/>
				</div>
				{navChoice === 'hfotd' && (
					<>
						<div className='col-12 col-md-9'>
							<div className='card'>
								<div className='card-body'>
									<AddHFOTD />
								</div>
							</div>
						</div>
						<div className='col-12 mt-3'>
							<div className='card'>
								<div className='card-body'>
									<ListHFOTD />
								</div>
							</div>
						</div>
					</>
				)}
				{navChoice === 'potd' && (
					<>
						<div className='col-12 col-md-9'>
							<div className='card'>
								<div className='card-body'>
									<AddPOTD />
								</div>
							</div>
						</div>
						<div className='col-12 mt-3'>
							<div className='card'>
								<div className='card-body'>
									<ListPOTD />
								</div>
							</div>
						</div>
					</>
				)}
				{navChoice === 'users' && (
					<>
						<AdminUsers />
					</>
				)}
			</div>
		</>
	);
};

export default Admin;
