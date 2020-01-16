import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddTopic from './AddTopic';
import TopicRow from './TopicRow';

const TopicsTable = props => {
	const { firebase, currentCategory, setCurrentTopic, setLocation } = props;

	const [topics, setTopics] = useState([]);
	const [addTopic, setAddTopic] = useState(false);
	const [topicLoading, setTopicLoading] = useState(true);

	const [page, setPage] = useState(0);

	const [topicsPerPage, setTopicsPerPage] = useState(5);
	const [lastTopicVisible, setLastTopicVisible] = useState(null);

	useLayoutEffect(() => {
		console.dir(currentCategory);
		return firebase.db
			.collection('forum')
			.where('category', '==', currentCategory)
			.orderBy('posted', 'desc')
			.limit(topicsPerPage)
			.onSnapshot(topicsSnap => {
				setLastTopicVisible(
					topicsSnap.docs[topicsSnap.docs.length - 1]
				);
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
	}, [currentCategory, firebase, topicsPerPage]);
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
								key={topic.thread.id}
								id={topic.thread.id}
								title={topic.thread.data().title}
								username={topic.user.data().username}
								posted={topic.thread.data().posted.toDate()}
								lastPost={topic.thread.data().lastPost.toDate()}
								currentCategory={currentCategory}
								setCurrentTopic={setCurrentTopic}
								setLocation={setLocation}
								photoURL={topic.user.data().photoURL}
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
					<li className='list-group-item'>
						<div className='row'>
							<div className='col-1 mx-auto'>
								<div className='spinner-border' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							</div>
						</div>
					</li>
				)}
				<nav
					aria-label='Page navigation example'
					className='mx-auto my-3'>
					<ul className='pagination'>
						<li className='page-item'>
							<button className='btn page-link'>Previous</button>
						</li>
						<li className='page-item'>
							<button
								onClick={e => {
									e.preventDefault();
									firebase.db
										.collection('forum')
										.where(
											'category',
											'==',
											currentCategory
										)
										.orderBy('posted', 'desc')
										.startAfter(lastTopicVisible)
										.limit(topicsPerPage)
										.onSnapshot(topicsSnap => {
											setTopics([]);
											setLastTopicVisible(
												topicsSnap.docs[
													topicsSnap.docs.length - 1
												]
											);
											if (topicsSnap.empty) {
												setTopicLoading(false);
											} else {
												setTopics([]);
												topicsSnap.forEach(topicDoc => {
													firebase
														.getUserDataFromUID(
															topicDoc.data().user
														)
														.then(userDoc => {
															setTopics(prev => [
																...prev,
																{
																	thread: topicDoc,
																	user: userDoc,
																},
															]);
															setTopicLoading(
																false
															);
														});
												});
											}
										});
								}}
								className='btn page-link'>
								Next
							</button>
						</li>
					</ul>
				</nav>
			</ul>
		</>
	);
};

export default withFirebase(TopicsTable);
