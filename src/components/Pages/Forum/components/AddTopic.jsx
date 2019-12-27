import React, { useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import { withRouter } from 'react-router-dom';

const AddTopic = props => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	return (
		<>
			<button
				className='btn btn-primary mb-3 d-block mx-auto'
				onClick={() => props.setAddTopic(true)}>
				+ Add Topic
			</button>
			{props.addTopic && (
				<div className='card mb-3'>
					<div className='card-body'>
						{props.firebase.auth.currentUser ? (
							<form>
								<div className='form-group'>
									<label htmlFor='title'>Title:</label>
									<input
										name='title'
										type='text'
										className='form-control'
										value={title}
										onChange={e => setTitle(e.target.value)}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='content'>Content:</label>
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
								<input
									type='submit'
									value='Post Topic'
									className='btn btn-primary d-block mx-auto'
								/>
							</form>
						) : (
							<p>
								If you want to post to the forum, you need to{' '}
								<button
									className='btn btn-sm btn-link'
									onClick={() =>
										props.history.replace('/login')
									}>
									Sign In
								</button>
							</p>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default withRouter(withFirebase(AddTopic));
