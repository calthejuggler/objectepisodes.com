import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../Firebase/context';
import { CategoryTable } from './components/CategoryTable';

const Forum = props => {
	const [categories, setCategories] = useState([]);
	const [currentCategory, setCurrentCategory] = useState(null);
	const [location, setLocation] = useState(['forum']);
	useLayoutEffect(() => {
		props.firebase.db
			.collection('forum')
			.get()
			.then(snap =>
				snap.forEach(category => {
					setCategories(prev => [...prev, category.ref.id]);
				})
			);
		return () => {};
	}, [props.firebase]);
	return (
		<div className='row'>
			<div className='col-12'>
				<div className='card'>
					<div className='card-body'>
						<h3 className='text-center'>Forum</h3>
						<nav aria-label='breadcrumb'>
							<ol className='breadcrumb'>
								{location.map((loc, i) => (
									<li
										className={
											i === location.length - 1
												? 'breadcrumb-item active'
												: 'breadcrumb-item'
										}
										aria-current='page'
										key={loc}>
										{loc[0].toUpperCase() + loc.slice(1)}
									</li>
								))}
							</ol>
						</nav>
						{!currentCategory ? (
							<CategoryTable
								categories={categories}
								setCurrentCategory={setCurrentCategory}
								setLocation={setLocation}
							/>
						) : (
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
								<tbody className='tbody'>
                                    
                                </tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withFirebase(Forum);
