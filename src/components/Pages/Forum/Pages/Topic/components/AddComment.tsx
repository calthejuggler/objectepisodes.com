import React, { useState, FC, FormEvent } from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import TextAreaInput from '../../../../../elements/TextAreaInput/TextAreaInput';
import Firebase from './../../../../../Firebase/index';
import { Node } from 'slate';

interface Props {
	currentCategory: string | undefined;
	currentTopic: string | undefined;
	firebase: Firebase;
}

const AddComment: FC<Props> = props => {
	const { currentCategory, currentTopic, firebase } = props;
	const [comment, setComment] = useState<Node[]>([
		{
			type: 'paragraph',
			children: [{ text: '' }]
		}
	]);
	const [error, setError] = useState<null | string>(null);
	const handleCommentSubmit = (e: FormEvent) => {
		e.preventDefault();
		firebase.db
			.collection('forum-replies')
			.add({
				comment: comment,
				user: firebase.auth.currentUser.uid,
				topicID: currentTopic,
				timestamp: new Date()
			})
			.then(() => {
				if (currentTopic !== undefined)
					firebase.db
						.collection('forum')
						.doc(currentTopic.trim())
						.update({
							lastPost: new Date()
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
			.catch((e: { message: string }) => setError(e.message));
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
