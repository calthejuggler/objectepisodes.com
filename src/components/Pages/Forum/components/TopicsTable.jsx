import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddTopic from './AddTopic';
import { TopicRow } from './TopicRow';

const TopicsTable = props => {
	const [topics, setTopics] = useState([]);
	const [addTopic, setAddTopic] = useState(false);
	useLayoutEffect(() => {
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
						console.dir(topic.thread.data().lastPost);
						return (
							<TopicRow
								key={topic.thread.ref.id}
								title={topic.thread.data().title}
								username={topic.user.data().username}
								posted={topic.thread
									.data()
									.posted.toDate()
									.toDateString()}
								lastPost={topic.thread
									.data()
									.lastPost.toDate()
									.toDateString()}
							/>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default withFirebase(TopicsTable);
