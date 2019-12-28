import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddTopic from './AddTopic';

const TopicsTable = props => {
	const [topics, setTopics] = useState([]);
	const [addTopic, setAddTopic] = useState(false);
	useEffect(() => {
		props.firebase.db
			.collection('forum')
			.doc(props.currentCategory)
			.collection('topics')
			.get()
			.then(snap => {
				snap.forEach(doc => {
					props.firebase.db
						.collection('users')
						.doc(doc.data().user)
						.get()
						.then(docRef => {
							setTopics(prev => [
								...prev,
								{ thread: doc, user: docRef },
							]);
						});
				});
			})
			.catch(e => console.dir(e));
	}, [props.currentCategory, props.firebase.db]);
	return (
		<>
			<AddTopic
				addTopic={addTopic}
				setAddTopic={setAddTopic}
				currentCategory={props.currentCategory}
			/>
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
					{topics.map(topic => {
						return (
							<tr key={topic.thread.ref.id}>
								<td>{topic.thread.data().title}</td>
								<td>{topic.user.data().username}</td>
								<td>
									{topic.thread
										.data()
										.posted.toDate()
										.toDateString()}
								</td>
								<td>
									{topic.thread
										.data()
										.lastPost.toDate()
										.toDateString()}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default withFirebase(TopicsTable);
