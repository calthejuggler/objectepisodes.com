import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddComment from './AddComment';

const Topic = props => {
	const { firebase, currentTopic, currentCategory } = props;

	const [post, setPost] = useState(null);

	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(true);

	useLayoutEffect(() => {
		firebase
			.getForumPostFromTopic(currentCategory, currentTopic)
			.then(topicSnap => {
				firebase
					.getUserDataFromUID(topicSnap.data().user.trim())
					.then(topicUserSnap => {
						setPost({
							data: topicSnap.data(),
							user: topicUserSnap.data(),
						});
						firebase.db
							.collection('forum-replies')
							.where('topicID', '==', currentTopic)
							.orderBy('timestamp')
							.onSnapshot(replySnap => {
								if (replySnap.empty) {
									setCommentsLoading(false);
								} else {
									setComments([]);
									replySnap.forEach(reply => {
										firebase
											.getUserDataFromUID(
												reply.data().user
											)
											.then(user => {
												setComments(prev => [
													...prev,
													{
														user: user.data(),
														data: reply.data(),
													},
												]);
												setCommentsLoading(false);
											});
									});
								}
							});
					})
					.catch(e => console.dir(e.message));
			});
		return () => {
			setPost(null);
			setComments([]);
		};
	}, [currentCategory, currentTopic, firebase]);

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
								<>
									<h2>{post.data.title}</h2>
									<a href={'#/user/' + post.user.username}>
										{post.user.username}
									</a>
									<p>
										{post.data.posted
											.toDate()
											.toUTCString()}
									</p>
									<p>{post.data.content}</p>
								</>
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
						<div
							className='col-12 mt-1'
							key={
								comment.data.comment +
								comment.data.timestamp.toDate().toDateString()
							}>
							<div className='card'>
								<div className='card-body'>
									<a href={'#/user/' + comment.user.username}>
										{comment.user.username}
									</a>
									<p>
										{comment.data.timestamp
											.toDate()
											.toUTCString()}
									</p>
									<p>{comment.data.comment}</p>
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
