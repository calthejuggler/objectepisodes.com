import React, { useState } from 'react';
import AdminNav from './AdminNav';
import AdminSection from './AdminSection';
import { adminSections } from './admin-sections';
import EditUsers from './EditUsers/EditUsers';

const Admin = () => {
	const [navChoice, setNavChoice] = useState<string>('users');
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
				{adminSections.map((section) => {
					const { title } = section;
					if (navChoice === title) {
						if (title !== 'users') {
							return (
								<AdminSection
									adminSection={section}
									editTemplate={editTemplate}
									key={title}
								/>
							);
						} else {
							return <EditUsers key={section.title} />;
						}
					}
					return null
				})}
			</div>
		</>
	);
};

export default Admin;
