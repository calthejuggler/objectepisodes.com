import React, { useState } from 'react';
import { withFirebase } from '../../../Firebase/context';

const AddComment = props => {
	const { currentCategory, currentTopic, firebase } = props;
	const [comment, setComment] = useState('');
	const [error, setError] = useState(null);
	const handleCommentSubmit = e => {
		e.preventDefault();
		firebase.db
			.collection('forum-replies')
			.add({
				comment: comment,
				user: firebase.auth.currentUser.uid,
				topicID: currentTopic,
				timestamp: new Date(),
			})
			.then(() => {
				setComment('');
				firebase.db
					.collection('forum')
					.doc(currentCategory)
					.collection('topics')
					.doc(currentTopic.trim())
					.update({
						lastPost: new Date(),
					})
					.then(() => {
						firebase.db
							.collection('forum')
							.doc(currentCategory)
							.update({ lastPost: new Date() });
					});
			})
			.catch(e => setError(e.message));
	};
	return (
		<form className='mt-1' onSubmit={handleCommentSubmit}>
			{error && <div className='alert alert-danger'>{error}</div>}
			<textarea
				className='form-control'
				placeholder='Add a comment...'
				name='comment'
				id='comment'
				value={comment}
				onChange={e => {
					setComment(e.target.value);
				}}></textarea>
			<button type='submit' className='btn btn-primary w-100'>
				Submit
			</button>
		</form>
	);
};

export default withFirebase(AddComment);
