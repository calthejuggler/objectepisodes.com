import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../Firebase/context';

const Forum = props => {
	const [categories, setCategories] = useState([]);
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
		<div className='text-center'>
			<h3>Forum</h3>
			Choose a category...
			<table>
				{categories.map(category => (
					<tr key={category}>
						<td>{category}</td>
					</tr>
				))}
			</table>
		</div>
	);
};

export default withFirebase(Forum);
