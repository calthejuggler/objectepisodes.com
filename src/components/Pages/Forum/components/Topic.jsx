import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddComment from './AddComment';

const Topic = props => {
	const { currentTopic, currentCategory } = props;

	const [post, setPost] = useState({
		data: {},
		user: {},
	});

	const [comments, setComments] = useState([]);

	useLayoutEffect(() => {
		props.firebase.db
			.collection('forum')
			.doc(currentCategory)
			.collection('topics')
			.doc(currentTopic)
			.get()
			.then(doc => {
				props.firebase.db
					.collection('users')
					.doc(doc.data().user)
					.get()
					.then(userDoc => {
						setPost({
							data: doc.data(),
							user: userDoc.data(),
						});
					});
			});
		props.firebase.db
			.collection('forum')
			.doc(currentCategory)
			.collection('topics')
			.doc(currentTopic)
			.collection('comments')
			.get()
			.then(snap => {
				snap.forEach(comment => {
					props.firebase.db
						.collection('users')
						.doc(comment.data().user)
						.get()
						.then(userDoc => {
							setComments(prev => [
								...prev,
								{ data: comment.data(), user: userDoc.data() },
							]);
						});
				});
			});
	}, [currentCategory, currentTopic, props.firebase.db]);

	return (
		<>
			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							<h4 className='card-title'>{post.data.title}</h4>
							<p>{post.user.username}</p>
							<p>{post.data.content}</p>
						</div>
					</div>
				</div>
			</div>
			{comments.map((comment, i) => (
				<div className='row' key={i}>
					<div className='col-12'>
						<div className='card mt-1'>
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
				</div>
			))}
			<div className='row'>
				<div className='col-12'>
					<AddComment
						currentCategory={currentCategory}
						currentTopic={currentTopic}
					/>
				</div>
			</div>
		</>
	);
};

export default withFirebase(Topic);
