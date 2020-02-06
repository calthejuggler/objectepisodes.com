import React, { useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import { withRouter } from 'react-router-dom';

const AddTopic = props => {
	const { firebase, currentCategory, setAddTopic, addTopic, history } = props;

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const [error, setError] = useState(null);

	const handleAddTopicSubmit = e => {
		e.preventDefault();
		firebase.db
			.collection('forum')
			.add({
				content: content,
				category: currentCategory,
				title: title,
				posted: new Date(),
				lastPost: new Date(),
				user: firebase.auth.currentUser.uid,
			})
			.then(() => {
				firebase.incrementForumPosts(firebase.auth.currentUser.uid);
				setTitle('');
				setContent('');
				setAddTopic(false);
			})
			.catch(e => setError(e.message));
	};

	return (
		<>
			<button
				type='button'
				className='btn btn-primary mb-3 d-block mx-auto'
				data-toggle='modal'
				data-target='#addTopicModal'>
				+ Topic
			</button>

			<div
				className='modal fade'
				id='addTopicModal'
				tabIndex='-1'
				role='dialog'
				aria-labelledby='addTopicModalLabel'
				aria-hidden='true'>
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
								aria-label='Close'>
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
										<label htmlFor='title'>Title:</label>
										<input
											name='title'
											type='text'
											className='form-control'
											value={title}
											onChange={e =>
												setTitle(e.target.value)
											}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='content'>
											Content:
										</label>
										<textarea
											name='content'
											id=''
											cols='30'
											rows='10'
											className='form-control'
											value={content}
											onChange={e =>
												setContent(e.target.value)
											}></textarea>
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
										}>
										Sign In
									</button>
								</p>
							)}
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-dismiss='modal'>
								Cancel
							</button>
							<button
								type='button'
								className='btn btn-primary'
								onClick={handleAddTopicSubmit}>
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
