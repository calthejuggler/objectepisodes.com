import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../../Firebase/context';

import AddComment from './components/AddComment';
import PostView from './components/PostView';

const Topic = props => {
	const { firebase, currentTopic, currentCategory, setTitle } = props;

	const [post, setPost] = useState(null);

	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(true);

	useLayoutEffect(() => {
		return firebase.db
			.collection('forum')
			.doc(currentTopic)
			.onSnapshot(topicSnap => {
				setPost(null);
				firebase
					.getUserDataFromUID(topicSnap.data().user.trim())
					.then(topicUserSnap => {
						setTitle('Loading Topic');
						setPost({
							data: topicSnap.data(),
							user: topicUserSnap.data(),
							id: topicSnap.id,
						});
					})
					.catch(e => console.dir(e.message));
			});
	}, [currentCategory, currentTopic, firebase, setTitle]);

	useLayoutEffect(() => {
		return firebase.db
			.collection('forum-replies')
			.where('topicID', '==', currentTopic)
			.orderBy('timestamp', 'desc')
			.onSnapshot(replySnap => {
				setComments([]);
				if (replySnap.empty) {
					setCommentsLoading(false);
				} else {
					replySnap.forEach(reply => {
						firebase
							.getUserDataFromUID(reply.data().user)
							.then(user => {
								setComments(prev => [
									...prev,
									{
										user: user.data(),
										data: reply.data(),
										id: reply.id,
									},
								]);
								setCommentsLoading(false);
							});
					});
				}
			});
	}, [currentTopic, firebase]);

	return (
		<>
			<div className='row'>
				<div className='col-12'>
					<h3 className='m-2 text-center text-md-left'>
						Original Post
					</h3>
				</div>
				<PostView post={post} />
				<div className='col-12'>
					<h3 className='m-2 text-center text-md-left'>
						Recent Comments <small>(Date - desc.)</small>
					</h3>
					<AddComment
						currentCategory={currentCategory}
						currentTopic={currentTopic}
					/>
				</div>
				{commentsLoading ? (
					<div className='col-12 mt-1'>
						<div className='card'>
							<div className='d-flex justify-content-center'>
								<div
									className='spinner-border mx-auto'
									role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							</div>
						</div>
					</div>
				) : comments.length === 0 ? (
					<div className='col-12 mt-1'>
						<div className='card'>
							<div className='card-body'>
								<p>
									There are no comments. Be the first to add
									one!
								</p>
							</div>
						</div>
					</div>
				) : (
					comments.map(comment => (
						<PostView post={comment} key={comment.id} />
					))
				)}
			</div>
		</>
	);
};

export default withFirebase(Topic);
