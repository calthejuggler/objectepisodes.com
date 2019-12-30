import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddComment from './AddComment';

const Topic = props => {
	const { currentTopic, currentCategory } = props;

	const [post, setPost] = useState(null);

	const [comments, setComments] = useState([]);

	useLayoutEffect(() => {
		props.firebase.db
			.collection('forum')
			.doc(currentCategory)
			.collection('topics')
			.doc(currentTopic.trim())
			.get()
			.then(topicSnap => {
				props.firebase.db
					.collection('users')
					.doc(topicSnap.data().user.trim())
					.get()
					.then(topicUserSnap => {
						setPost({
							data: topicSnap.data(),
							user: topicUserSnap.data(),
						});
						props.firebase.db
							.collection('forum')
							.doc(currentCategory)
							.collection('topics')
							.doc(currentTopic.trim())
							.collection('comments')
							.get()
							.then(commentsSnap => {
								commentsSnap.forEach(commentSnap =>
									props.firebase.db
										.collection('users')
										.doc(commentSnap.data().user.trim())
										.get()
										.then(commentUserSnap => {
											setComments(prev => [
												...prev,
												{
													data: commentSnap.data(),
													user: commentUserSnap.data(),
												},
											]);
										})
								);
							});
					});
			});
		return () => {};
	}, [currentCategory, currentTopic, props.firebase.db]);

	return (
		<>
			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							{!post ? (
								<p>Loading...</p>
							) : (
								<>
									<h2>{post.data.title}</h2>
									<p>{post.user.username}</p>
									<p>
										{post.data.posted
											.toDate()
											.toDateString()}
									</p>
									<p>{post.data.content}</p>
								</>
							)}
						</div>
					</div>
				</div>
				{!comments[0] ? (
					<div className='col-12'>
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
									<p>{comment.user.username}</p>
									<p>
										{comment.data.timestamp
											.toDate()
											.toDateString()}
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
