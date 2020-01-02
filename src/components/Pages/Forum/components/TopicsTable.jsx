import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddTopic from './AddTopic';
import TopicRow from './TopicRow';

const TopicsTable = props => {
	const { firebase, currentCategory, setCurrentTopic, setLocation } = props;

	const [topics, setTopics] = useState([]);
	const [addTopic, setAddTopic] = useState(false);
	const [topicLoading, setTopicLoading] = useState(true);

	useLayoutEffect(() => {
		firebase
			.getForumTopicsFromCategory(currentCategory)
			.then(topicsSnap => {
				topicsSnap.forEach(topicDoc => {
					firebase
						.getUserDataFromUID(topicDoc.data().user)
						.then(userDoc => {
							setTopics(prev => [
								...prev,
								{ thread: topicDoc, user: userDoc },
							]);
							setTopicLoading(false);
						});
				});
			})
			.catch(e => console.dir(e));
	}, [currentCategory, firebase]);
	return (
		<>
			<AddTopic
				addTopic={addTopic}
				setAddTopic={setAddTopic}
				currentCategory={currentCategory}
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
					{!topicLoading ? (
						topics.length !== 0 ? (
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
									currentCategory={currentCategory}
									setCurrentTopic={setCurrentTopic}
									setLocation={setLocation}
								/>
							))
						) : (
							<tr>
								<td colSpan='4'>
									<p>
										There are no topics here yet! Will you
										be the first to post one?
									</p>
								</td>
							</tr>
						)
					) : (
						<tr>
							<td colSpan='4'>
								<div className='d-flex justify-content-center'>
									<div
										className='spinner-border mx-auto'
										role='status'>
										<span className='sr-only'>
											Loading...
										</span>
									</div>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
};

export default withFirebase(TopicsTable);
