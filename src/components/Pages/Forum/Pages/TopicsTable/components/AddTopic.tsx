import React, { useState, FC, FormEvent } from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import $ from 'jquery';
import TextAreaInput from '../../../../../elements/TextAreaInput/TextAreaInput';
import Firebase from './../../../../../Firebase/index';
import { Node } from 'slate';

interface Props extends RouteComponentProps {
	firebase: Firebase;
	currentCategory: string | undefined;
}

const AddTopic: FC<Props> = props => {
	const { firebase, currentCategory, history } = props;

	const [title, setTitle] = useState('');
	const [content, setContent] = useState<Array<Node>>([
		{
			type: 'paragraph',
			children: [{ text: '' }]
		}
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
						user: firebase.auth.currentUser.uid
					})
					.then(() => {
						firebase.incrementForumPosts(
							firebase.auth.currentUser.uid
						);
						setTitle('');
						$('#addTopicModal').modal('hide');
					})
					.catch((e:{message:string}) => setError(e.message));
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
							{firebase.auth.currentUser ? (
								<form>
									<div className='form-group'>
										<input
											name='title'
											type='text'
											className='form-control'
											placeholder='Write your post title here...'
											value={title}
											onChange={e =>
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
									<button
										className='btn btn-sm btn-link'
										onClick={() =>
											history.replace('/login')
										}
									>
										Sign In
									</button>
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

export default withRouter(withFirebase(AddTopic));
