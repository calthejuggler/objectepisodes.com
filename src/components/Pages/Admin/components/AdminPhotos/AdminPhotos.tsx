import React from 'react';
import AddPhoto from './components/AddPhoto';

const AdminPhotos = () => {
	return (
		<>
			<AddPhoto />
			<div className='col-12'>
				<h1>Edit Database</h1>
			</div>
		</>
	);
};

export default AdminPhotos;
