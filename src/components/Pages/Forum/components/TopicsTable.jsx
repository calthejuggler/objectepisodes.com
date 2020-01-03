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
		firebase.db
			.collection('forum')
			.doc(currentCategory)
			.collection('topics')
			.orderBy('posted', 'desc')
			.onSnapshot(topicsSnap => {
				if (topicsSnap.empty) {
					setTopicLoading(false);
				} else {
					setTopics([]);
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
				}
			});
	}, [currentCategory, firebase]);
	return (
		<>
			<AddTopic
				addTopic={addTopic}
				setAddTopic={setAddTopic}
				currentCategory={currentCategory}
			/>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item'>
					<div className='row align-items-center'>
						<div className='col-6 col-sm-3'>
							<b>Title</b>
						</div>
						<div className='col-6 col-sm-3'>
							<b>By</b>
						</div>
						<div className='col-3 d-none d-sm-block'>
							<b>Date</b>
						</div>
						<div className='col-3 d-none d-sm-block'>
							<b>Last Post</b>
						</div>
					</div>
				</li>
				{!topicLoading ? (
					topics.length !== 0 ? (
						topics.map(topic => (
							<TopicRow
								key={topic.thread.ref.id}
								id={topic.thread.ref.id}
								title={topic.thread.data().title}
								username={topic.user.data().username}
								posted={topic.thread.data().posted.toDate()}
								lastPost={topic.thread.data().lastPost.toDate()}
								currentCategory={currentCategory}
								setCurrentTopic={setCurrentTopic}
								setLocation={setLocation}
							/>
						))
					) : (
						<li className='list-group-item'>
							<div className='row'>
								<div className='col-12'>
									<p>
										There are no topics here yet! Will you
										be the first to post one?
									</p>
								</div>
							</div>
						</li>
					)
				) : (
					<li className="list-group-item">
						<div className="row">
							<div className='col-1 mx-auto'>
								<div
									className='spinner-border'
									role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							</div>
						</div>
					</li>
				)}
			</ul>
		</>
	);
};

export default withFirebase(TopicsTable);
