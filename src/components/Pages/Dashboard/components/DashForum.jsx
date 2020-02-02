import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import LikeButton from '../../Forum/components/LikeButton';

const DashForum = props => {
	const { firebase } = props;
	const [topLikedTopics, setTopLikedTopics] = useState([]);
	const [postsLoading, setPostsLoading] = useState(true);
	useLayoutEffect(() => {
		setPostsLoading(true);
		firebase.db
			.collection('forum')
			.orderBy('likeCount', 'desc')
			.limit(3)
			.onSnapshot(likedTopicsSnap => {
				setPostsLoading(true);
				setTopLikedTopics([]);
				likedTopicsSnap.forEach(likedTopicSnap => {
					firebase
						.getUserDataFromUID(likedTopicSnap.data().user)
						.then(userData => {
							setTopLikedTopics(prev => [
								...prev,
								{
									topicData: likedTopicSnap.data(),
									user: userData.data(),
									category: likedTopicSnap.data().category,
									id: likedTopicSnap.id,
								},
							]);
						});
				});
				setPostsLoading(false);
			});
	}, [firebase]);
	return (
		<div className='card h-100'>
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
						topLikedTopics.map(topic => (
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
												'#/user/' + topic.user.username
											}>
											<span
												style={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												<img
													src={topic.user.photoURL}
													alt='Topic User Profile'
													className='rounded-circle mr-lg-2'
													style={{
														width: '2.5rem',
														height: '2.5rem',
														objectFit: 'cover',
														textAlign: 'center',
													}}
												/>
												<p className='card-text'>
													{topic.user.username}
												</p>
											</span>
										</a>
									</div>
									<div className='col-4'>
										<LikeButton
											postID={topic.id}
											likes={topic.topicData.likes}
											type='post'
											size={2}
										/>
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
