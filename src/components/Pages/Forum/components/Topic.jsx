import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddComment from './AddComment';
import LikeButton from './LikeButton';

const Topic = props => {
	const { firebase, currentTopic, currentCategory } = props;

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
						setPost({
							data: topicSnap.data(),
							user: topicUserSnap.data(),
							id: topicSnap.id,
						});
					})
					.catch(e => console.dir(e.message));
			});
	}, [currentCategory, currentTopic, firebase]);

	useLayoutEffect(() => {
		return firebase.db
			.collection('forum-replies')
			.where('topicID', '==', currentTopic)
			.orderBy('timestamp')
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
					<div className='card'>
						<div className='card-body'>
							{!post ? (
								<div className='d-flex justify-content-center'>
									<div
										className='spinner-border mx-auto'
										role='status'>
										<span className='sr-only'>
											Loading...
										</span>
									</div>
								</div>
							) : (
								<div className='row align-items-center'>
									<div className='col-12'>
										<h5>{post.data.title}</h5>
									</div>
									<div className='col-10'>
										<a
											href={
												'#/user/' + post.user.username
											}>
											{post.user.username}
										</a>
										<p>
											{post.data.posted
												.toDate()
												.toUTCString()}
										</p>
									</div>
									<div className='col-2'>
										<LikeButton
											postID={post.id}
											likes={post.data.likes}
											type='post'
										/>
									</div>
									<div className='col-12'>
										<p>{post.data.content}</p>
									</div>
								</div>
							)}
						</div>
					</div>
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
						<div className='col-12 mt-1' key={comment.id}>
							<div className='card'>
								<div className='card-body'>
									<div className='row align-items-center'>
										<div className='col-10'>
											<a
												href={
													'#/user/' +
													comment.user.username
												}>
												{comment.user.username}
											</a>
											<p>
												{comment.data.timestamp
													.toDate()
													.toUTCString()}
											</p>
										</div>
										<div className='col-2'>
											<LikeButton
												postID={comment.id}
												likes={comment.data.likes}
												type='comment'
											/>
										</div>
										<div className='col-12'>
											<p>{comment.data.comment}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
			<AddComment
				currentCategory={currentCategory}
				currentTopic={currentTopic}
			/>
		</>
	);
};

export default withFirebase(Topic);
