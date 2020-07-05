import React, { useState, FC, FormEvent, useMemo } from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import TextAreaInput from '../../../../../elements/TextAreaInput/TextAreaInput';
import Firebase from './../../../../../Firebase/index';
import { Node, createEditor } from 'slate';
import { withAuth } from './../../../../../Session/withAuth';
import { UserContextInterface } from '../../../../../Session/context';
import { ReactEditor, withReact } from 'slate-react';

interface Props {
	currentCategory: string | undefined;
	currentTopic: string | undefined;
	firebase: Firebase;
	user: UserContextInterface;
}

const initialNode = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
] as Node[];

const AddComment: FC<Props> = (props) => {
	const { currentCategory, currentTopic, firebase, user } = props;
	const [comment, setComment] = useState<Node[]>(initialNode);
	const [error, setError] = useState<null | string>(null);

	const editor: ReactEditor = useMemo(() => withReact(createEditor()), []);

	const handleCommentSubmit = (e: FormEvent) => {
		e.preventDefault();
		!user.data
			? setError('We have not yet loaded your user data from the server')
			: firebase.db
					.collection('forum-replies')
					.add({
						comment: comment,
						user: {
							id: user.auth?.uid,
							name: user.auth?.displayName,
							photoURL: user.auth?.photoURL,
							username: user.data?.username,
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
								});
					})
					.then(() =>
						firebase.db
							.collection('forum-categories')
							.doc(currentCategory)
							.update({ lastPost: new Date() })
					)
					.then(
						() =>
							user.auth &&
							firebase.incrementForumPosts(user.auth.uid)
					)
					.then(() => {
						editor.selection = null;
						setComment(initialNode);
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
					editor={editor}
				/>
				<button type='submit' className='btn btn-primary w-100'>
					Submit
				</button>
			</form>
		</>
	);
};

export default withFirebase(withAuth(AddComment));
