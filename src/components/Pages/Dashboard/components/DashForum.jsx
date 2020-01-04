import React, { useLayoutEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../Firebase/context';

const DashForum = props => {
	const { history, firebase } = props;
	const [topLikedTopics, setTopLikedTopics] = useState([]);
	useLayoutEffect(() => {
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
			});
	}, [firebase]);
	return (
		<div className='row'>
			<div className='col-12 col-md-4'>
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
							{topLikedTopics.map(topic => (
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
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withFirebase(withRouter(DashForum));
