import React, { useState, SFC, FormEvent } from 'react';
import { withFirebase } from '../../../../../Firebase/context';

import $ from 'jquery';
import TextAreaInput from '../../../../../elements/TextAreaInput/TextAreaInput';
import Firebase from './../../../../../Firebase/index';
import { Node } from 'slate';
import { withAuth } from './../../../../../Session';
import { UserContextInterface } from '../../../../../Session/context';

interface Props {
	firebase: Firebase;
	currentCategory: string | undefined;
	user: UserContextInterface;
}

const AddTopic: SFC<Props> = (props) => {
	const { firebase, currentCategory, user } = props;

	const [title, setTitle] = useState('');
	const [content, setContent] = useState<Array<Node>>([
		{
			type: 'paragraph',
			children: [{ text: '' }],
		},
	]);

	const [error, setError] = useState<string | null>(null);

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
							id: user?.uid,
							name: user?.displayName,
							photoURL: user?.photoURL
								? user?.photoURL
								: undefined,
						},
					})
					.then(() => {
						if (user) {
							firebase.incrementForumPosts(user?.uid);
							setTitle('');
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
							{user?.uid ? (
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
