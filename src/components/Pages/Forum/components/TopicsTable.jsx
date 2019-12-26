import React from 'react';

export const TopicsTable = () => {
	return (
		<table className='table'>
			<thead className='thead'>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Posted By</th>
					<th>Date</th>
					<th>Last Posted On</th>
				</tr>
			</thead>
			<tbody className='tbody'></tbody>
		</table>
	);
};
