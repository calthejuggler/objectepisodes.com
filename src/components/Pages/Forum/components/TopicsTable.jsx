import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';

const TopicsTable = props => {
	const [topics, setTopics] = useState([]);
	useEffect(() => {
		props.firebase.db
			.collection('forum')
			.doc(props.currentCategory)
			.collection('topics')
			.get()
			.then(snap => {
				snap.forEach(doc => setTopics(prev => [...prev, doc]));
			})
			.catch(e => console.dir(e));
	}, [props.currentCategory, props.firebase.db]);
	return (
		<table className='table'>
			<thead className='thead'>
				<tr>
					<th>Title</th>
					<th>By</th>
					<th>Date</th>
					<th>Last Post</th>
				</tr>
			</thead>
			<tbody className='tbody'>
				{topics.map(topic => (
					<tr key={topic.ref.id}>
						<td>{topic.data().title}</td>
						<td>{topic.data().user}</td>
						<td>{topic.data().posted.toDate().toDateString()}</td>
						<td>{topic.data().lastPost.toDate().toDateString()}</td>
                        {console.dir(topic.data().posted.toDate())}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default withFirebase(TopicsTable);
