import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../Firebase/context';

const CategoryTable = props => {
	const { categories, setCurrentCategory, setLocation, setTitle } = props;
	useEffect(() => {
		setTitle('Categories');
	}, [setTitle]);
	return (
		<ul className='list-group list-group-flush'>
			<li className='list-group-item'>
				<div className='row'>
					<div className='col-6'>
						<b>Category</b>
					</div>
					<div className='col-6'>
						<b>Last Post</b>
					</div>
				</div>
			</li>
			{categories.map(category => (
				<li className='list-group-item' key={category.id}>
					<div className='row align-items-center'>
						<div className='col-6'>
							<button
								className='btn btn-link'
								onClick={() => {
									setCurrentCategory(category.id);
									props.history.push('/forum/' + category.id);
									setLocation(prev => [...prev, category.id]);
									setTitle(category.id)
								}}>
								{category.id}
							</button>
						</div>
						<div className='col-6'>
							{category
								.data()
								.lastPost.toDate()
								.toUTCString()}
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default withFirebase(withRouter(CategoryTable));
