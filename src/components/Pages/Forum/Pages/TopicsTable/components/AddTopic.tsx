import React, { useState, FormEvent, FC, useMemo } from 'react';
import { withFirebase } from '../../../../../Firebase/context';

import $ from 'jquery';
import TextAreaInput from '../../../../../elements/TextAreaInput/TextAreaInput';
import Firebase from './../../../../../Firebase/index';
import { Node, createEditor } from 'slate';
import { withAuth } from './../../../../../Session';
import { UserContextInterface } from '../../../../../Session/context';
import { ReactEditor, withReact } from 'slate-react';

interface Props {
	firebase: Firebase;
	currentCategory: string | undefined;
	user: UserContextInterface;
}

const initialNode = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
] as Node[];

const AddTopic: FC<Props> = ({ firebase, currentCategory, user }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState<Node[]>(initialNode);

	const [error, setError] = useState<string | null>(null);

	const editor: ReactEditor = useMemo(() => withReact(createEditor()), []);

	const handleAddTopicSubmit = (e: FormEvent) => {
		e.preventDefault();
		title.trim() === ''
			? setError('You must add a title.')
			: firebase.db
					.collection('forum')
					.add({
						content: content,
						category: currentCategory,
						title: title,
						posted: new Date(),
						lastPost: new Date(),
						user: {
							id: user?.auth?.uid,
							name: user?.auth?.displayName,
							username: user?.data?.username,
							photoURL: user?.auth?.photoURL
								? user?.auth?.photoURL
								: undefined,
						},
					})
					.then(() => {
						if (user?.auth) {
							firebase.incrementForumPosts(user.auth.uid);
							setError(null);
							setTitle('');
							editor.selection = null;
							setContent(initialNode);
							$('#addTopicModal').modal('hide');
						}
					})
					.catch((e: { message: string }) => setError(e.message));
	};

	return (
		<>
			<button
				type='button'
				className='btn btn-primary mb-3'
				data-toggle='modal'
				data-target='#addTopicModal'
			>
				+ Topic
			</button>

			<div
				className='modal fade'
				id='addTopicModal'
				tabIndex={-1}
				role='dialog'
				aria-labelledby='addTopicModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='addTopicModalLabel'>
								Add Topic
							</h5>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>
							{error && (
								<div className='alert alert-danger'>
									{error}
								</div>
							)}
							{user?.auth?.uid ? (
								<form>
									<div className='form-group'>
										<input
											name='title'
											type='text'
											className='form-control'
											placeholder='Write your post title here...'
											value={title}
											onChange={(e) =>
												setTitle(e.target.value)
											}
										/>
									</div>
									<div className='form-group'>
										<TextAreaInput
											placeholder='Write your post content here...'
											setState={setContent}
											state={content}
											editor={editor}
										/>
									</div>
								</form>
							) : (
								<p>
									If you want to post to the forum, you need
									to{' '}
									<a
										href='/login'
										className='btn btn-sm btn-link'
									>
										Sign In
									</a>
								</p>
							)}
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-dismiss='modal'
							>
								Cancel
							</button>
							<button
								type='button'
								className='btn btn-primary'
								onClick={handleAddTopicSubmit}
							>
								Post
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default withFirebase(withAuth(AddTopic));
