import React, { FC } from 'react';

interface Props {
	editTemplate: boolean;
	error: string | null;
	success: boolean;
	editingNoun: string;
}

const AddAlerts: FC<Props> = ({
	editTemplate,
	error,
	success,
	editingNoun,
}) => {
	return (
		<>
			{editTemplate && (
				<div className='alert alert-danger mt-3'>
					You are currently editing the template for new {editingNoun}
					s. NOT adding a single {editingNoun}. Changes made here will
					apply to all previous and future {editingNoun} posts. Be
					sure that you want to make any changes before clicking save.
				</div>
			)}
			<h4 className='text-center'>
				Add{' '}
				{editingNoun.slice(0, 1).toUpperCase() + editingNoun.slice(1)}
			</h4>
			{error && <div className='alert alert-danger'>{error}</div>}
			{success && (
				<div className='alert alert-success'>
					The {editingNoun} has been added to the database!
				</div>
			)}
		</>
	);
};

export default AddAlerts;
