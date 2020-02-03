import React, { useState } from 'react';

import InspectUser from './components/InspectUser';
import UsersList from './components/UsersList';

const AdminUsers = () => {
	const [selectedUser, setSelectedUser] = useState(null);
	return (
		<>
			<div className='col-12 col-md-9'>
				<div className='card'>
					<div className='card-body'>
						<InspectUser selectedUser={selectedUser}/>
					</div>
				</div>
			</div>
			<div className='col-12 mt-3'>
				<div className='card'>
					<div className='card-body'>
						<UsersList setSelectedUser={setSelectedUser}/>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminUsers;
