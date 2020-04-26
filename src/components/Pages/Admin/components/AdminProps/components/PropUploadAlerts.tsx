import React, { FC } from 'react';

interface Props {
	editTemplate: boolean;
	error: string | null;
	success: boolean;
}

const PropUploadAlerts: FC<Props> = ({ editTemplate, error, success }) => {
	return (
		<>
			{editTemplate && (
				<div className='alert alert-danger mt-3'>
					You are currently editing the template for new Props. NOT
					adding a single prop. Changes made here will apply to all
					previous and future prop posts. Be sure that you want to
					make any changes before clicking submit.
				</div>
			)}
			<h3>Add Prop</h3>
			{error && <div className='alert alert-danger'>{error}</div>}
			{success && (
				<div className='alert alert-success'>
					The prop has been added to the database!
				</div>
			)}
		</>
	);
};

export default PropUploadAlerts;
