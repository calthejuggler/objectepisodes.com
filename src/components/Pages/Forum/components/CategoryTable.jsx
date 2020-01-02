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
					<tr key={category.id}>
						<td>
							<button
								className='btn btn-link'
								onClick={() => {
									setCurrentCategory(category.id);
									props.history.push('/forum/' + category.id);
									setLocation(prev => [
										...prev,
										category.id,
									]);
								}}>
								{category.id}
							</button>
						</td>
						<td>{category.data().lastPost.toDate().toUTCString()}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default withFirebase(withRouter(CategoryTable));
