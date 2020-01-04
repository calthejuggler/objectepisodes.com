import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';

const DashForum = props => {
	const { firebase } = props;
	const [topLikedTopics, setTopLikedTopics] = useState([]);
	const [postsLoading, setPostsLoading] = useState(true);
	useLayoutEffect(() => {
		setPostsLoading(true);
		firebase.db
			.collection('forum')
			.get()
			.then(catSnap => {
				catSnap.forEach(category => {
					firebase.db
						.collection('forum')
						.doc(category.id)
						.collection('topics')
						.orderBy('likeCount')
						.limit(3)
						.get()
						.then(likedTopicsSnap => {
							likedTopicsSnap.forEach(likedTopicSnap => {
								firebase
									.getUserDataFromUID(
										likedTopicSnap.data().user
									)
									.then(userData => {
										setTopLikedTopics(prev => [
											...prev,
											{
												topicData: likedTopicSnap.data(),
												user: userData.data(),
												category: category.id,
												id: likedTopicSnap.id,
											},
										]);
									});
							});
						});
				});
				setPostsLoading(false);
			});
	}, [firebase]);
	const compare = (a, b) => {
		const topicA = a.topicData.likeCount;
		const topicB = b.topicData.likeCount;

		let comparison = 0;
		if (topicA > topicB) {
			comparison = 1;
		} else if (topicA < topicB) {
			comparison = -1;
		}

		return comparison;
	};

	return (
		<div className='card'>
			<div className='card-body text-center'>
				<h4 className='card-title'>Top Forum Posts</h4>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						<div className='row align-items-center'>
							<div className='col-4'>
								<b>Title</b>
							</div>
							<div className='col-4'>
								<b>User</b>
							</div>
							<div className='col-4'>
								<b>Likes</b>
							</div>
						</div>
					</li>
					{postsLoading ? (
						<div className='d-flex justify-content-center'>
							<div
								className='spinner-border mx-auto'
								role='status'>
								<span className='sr-only'>Loading...</span>
							</div>
						</div>
					) : (
						topLikedTopics
							.sort(compare)
							.slice(-3)
							.map(topic => (
								<li className='list-group-item' key={topic.id}>
									<div className='row align-items-center'>
										<div className='col-4'>
											<a
												href={
													'#/forum/' +
													topic.category +
													'/' +
													topic.id
												}>
												{topic.topicData.title}
											</a>
										</div>
										<div className='col-4'>
											<a
												href={
													'#/user/' +
													topic.user.username
												}>
												{topic.user.username}
											</a>
										</div>
										<div className='col-4'>
											{topic.topicData.likeCount}
										</div>
									</div>
								</li>
							))
					)}
				</ul>
			</div>
		</div>
	);
};

export default withFirebase(DashForum);
