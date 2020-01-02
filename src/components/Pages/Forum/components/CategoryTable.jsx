import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../Firebase/context';

const CategoryTable = props => {
	const {categories, setCurrentCategory, setLocation} = props;
	return (
		<table className='table'>
			<thead className='thead'>
				<tr>
					<th scope='col'>Category</th>
					<th scope='col'>Last Post</th>
				</tr>
			</thead>
			<tbody className='tbody'>
				{categories.map(category => (
					<tr key={category}>
						<td>
							<button
								className='btn btn-link'
								onClick={() => {
									setCurrentCategory(category);
									props.history.push('/forum/' + category);
									setLocation(prev => [
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

export default withFirebase(withRouter(CategoryTable));
