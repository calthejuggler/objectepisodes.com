import React, { FC } from 'react';

import AddProp from './components/AddProp';

const AdminProps: FC<{ editTemplate: boolean }> = ({ editTemplate }) => {
	return (
		<>
			<AddProp editTemplate={editTemplate} />
			<div className='col-12 col-md-9'>Edit Props</div>
		</>
	);
};

export default AdminProps;
