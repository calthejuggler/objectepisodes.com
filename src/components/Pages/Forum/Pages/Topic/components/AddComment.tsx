import React, { useState } from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import TextAreaInput from '../../../../../elements/TextAreaInput/TextAreaInput';

const AddComment = props => {
	const { currentCategory, currentTopic, firebase } = props;
	const [comment, setComment] = useState<Array<object>>([
		{
			type: 'paragraph',
			children: [{ text: '' }],
		},
	]);
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
				firebase.db
					.collection('forum')
					.doc(currentTopic.trim())
					.update({
						lastPost: new Date(),
					})
					.then(() => {
						firebase.db
							.collection('forum-categories')
							.doc(currentCategory)
							.update({ lastPost: new Date() })
							.then(() => {
								firebase.incrementForumPosts(
									firebase.auth.currentUser.uid
								);
								
							});
					});
			})
			.catch(e => setError(e.message));
	};
	return (
		<>
			<form className='mt-1' onSubmit={handleCommentSubmit}>
				{error && <div className='alert alert-danger'>{error}</div>}
				<TextAreaInput
					state={comment}
					setState={setComment}
					placeholder='Write your comment here...'
				/>
				<button type='submit' className='btn btn-primary w-100'>
					Submit
				</button>
			</form>
		</>
	);
};

export default withFirebase(AddComment);
