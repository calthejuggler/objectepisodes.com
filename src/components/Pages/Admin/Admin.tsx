import React, { useState } from 'react';
import AddHFOTD from './components/AddHFOTD';
import ListHFOTD from './components/ListHFOTD';
import AdminNav from './components/AdminNav';
import ListPOTD from './components/ListPOTD';
import AdminUsers from './components/AdminUsers';
import AddPhoto from './components/AdminPhotos/components/AddPhoto';
import AdminPhotos from './components/AdminPhotos/AdminPhotos';

const Admin = () => {
	const [navChoice, setNavChoice] = useState<string>('photos');
	return (
		<>
			<div className='row mt-3'>
				<div className='col-12 col-md-3'>
					<AdminNav
						setNavChoice={setNavChoice}
						navChoice={navChoice}
					/>
				</div>
				{navChoice === 'photos' && <AdminPhotos />}
				{navChoice === 'potd' && (
					<>
						<div className='col-12 col-md-9'>
							<div className='card'>
								<div className='card-body'>
									<AddPhoto />
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
