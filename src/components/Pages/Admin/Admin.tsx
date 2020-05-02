import React, { useState } from 'react';
import AdminNav from './components/AdminNav';
import AdminProps from './components/AdminProps/AdminProps';
import { adminSections } from './admin-sections';

const Admin = () => {
	const [navChoice, setNavChoice] = useState<string>('props');
	const [editTemplate, setEditTemplate] = useState<boolean>(false);
	return (
		<>
			<div className='row mt-3'>
				<div className='col-12 col-md-3'>
					<AdminNav
						adminSections={adminSections}
						setNavChoice={setNavChoice}
						navChoice={navChoice}
						editTemplate={editTemplate}
						setEditTemplate={setEditTemplate}
					/>
				</div>
				{adminSections.map(
					(section) => navChoice === section.title && <AdminProps adminSection={section} editTemplate={editTemplate} />
				)}
			</div>
		</>
	);
};

export default Admin;
