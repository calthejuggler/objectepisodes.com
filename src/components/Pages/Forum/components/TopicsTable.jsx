import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddTopic from './AddTopic';
import TopicRow from './TopicRow';

const TopicsTable = props => {
	const [topics, setTopics] = useState([]);
	const [addTopic, setAddTopic] = useState(false);
	useLayoutEffect(() => {
		props.firebase.getForumTopicsFromCategory(props.currentCategory)
			.then(topicsSnap => {
				topicsSnap.forEach(topicDoc => {
					props.firebase.db
						.collection('users')
						.doc(topicDoc.data().user)
						.get()
						.then(userDoc => {
							setTopics(prev => [
								...prev,
								{ thread: topicDoc, user: userDoc },
							]);
						});
				});
			})
			.catch(e => console.dir(e));
	}, [props.currentCategory, props.firebase]);
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
					{topics.length !== 0 ? (
						topics.map(topic => (
							<TopicRow
								key={topic.thread.ref.id}
								id={topic.thread.ref.id}
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
								currentCategory={props.currentCategory}
								setCurrentTopic={props.setCurrentTopic}
								setLocation={props.setLocation}
							/>
						))
					) : (
						<tr>
							<td colSpan="4">
								<p>
									Either the topics are still loading or there are no topics here yet! Will you be
									the first to post one?
								</p>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
};

export default withFirebase(TopicsTable);
