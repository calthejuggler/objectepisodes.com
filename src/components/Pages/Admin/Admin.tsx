import React, { useState } from 'react';
import AdminNav from './components/AdminNav';
import ListPOTD from './components/ListPOTD';
import AdminUsers from './components/AdminUsers';
import AddPhoto from './components/AdminPhotos/components/AddPhoto';
import AdminPhotos from './components/AdminPhotos/AdminPhotos';
import AdminProps from './components/AdminProps/AdminProps';

const Admin = () => {
	const [navChoice, setNavChoice] = useState<string>('props');
	const [editTemplate, setEditTemplate] = useState<boolean>(false);
	return (
		<>
			<div className='row mt-3'>
				<div className='col-12 col-md-3'>
					<AdminNav
						setNavChoice={setNavChoice}
						navChoice={navChoice}
						editTemplate={editTemplate}
						setEditTemplate={setEditTemplate}
					/>
				</div>
				{navChoice === 'photos' && <AdminPhotos />}
				{navChoice === 'props' && <AdminProps />}
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
