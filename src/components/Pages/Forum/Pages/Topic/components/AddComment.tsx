import React, { useState, FC, FormEvent } from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import TextAreaInput from '../../../../../elements/TextAreaInput/TextAreaInput';
import Firebase from './../../../../../Firebase/index';
import { Node } from 'slate';
import { withAuth } from './../../../../../Session/withAuth';

interface Props {
	currentCategory: string | undefined;
	currentTopic: string | undefined;
	firebase: Firebase;
	user: any;
}

const AddComment: FC<Props> = (props) => {
	const { currentCategory, currentTopic, firebase, user } = props;
	const [comment, setComment] = useState<Node[]>([
		{
			type: 'paragraph',
			children: [{ text: '' }],
		},
	]);
	const [error, setError] = useState<null | string>(null);
	const handleCommentSubmit = (e: FormEvent) => {
		e.preventDefault();
		firebase.db
			.collection('forum-replies')
			.add({
				comment: comment,
				user: {
					id: user.uid,
					name: user.displayName,
					photoURL: user.photoURL,
				},
				topicID: currentTopic,
				timestamp: new Date(),
			})
			.then(() => {
				if (currentTopic !== undefined)
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
									firebase.incrementForumPosts(user.uid);
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

export default withAuth(withFirebase(AddComment));
