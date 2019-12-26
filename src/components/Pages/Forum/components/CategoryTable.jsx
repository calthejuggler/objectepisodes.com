import React from 'react';

export const CategoryTable = props => {
	return (
		<table className='table'>
			<thead className='thead'>
				<tr>
					<th scope='col'>Category</th>
					<th scope='col'>Last Post</th>
				</tr>
			</thead>
			<tbody className='tbody'>
				{props.categories.map(category => (
					<tr key={category}>
						<td>
							<button
								className='btn btn-link'
								onClick={() => {
									props.setCurrentCategory(category);
									props.setLocation(prev => [
										...prev,
										category,
									]);
								}}>
								{category}
							</button>
						</td>
						<td></td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
