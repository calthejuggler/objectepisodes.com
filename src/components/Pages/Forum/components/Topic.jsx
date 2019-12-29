import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import { AddComment } from './AddComment';

const Topic = props => {
	const { currentTopic, currentCategory } = props;

	const [post, setPost] = useState({ data: '', user: '' });

	useLayoutEffect(() => {
		props.firebase.db
			.collection('forum')
			.doc(currentCategory)
			.collection('topics')
			.doc(currentTopic)
			.get()
			.then(doc => {
				props.firebase.db
					.collection('users')
					.doc(doc.data().user)
					.get()
					.then(userDoc => {
						setPost({
							data: doc.data(),
							user: userDoc.data(),
						});
					});
			});
	}, [currentCategory, currentTopic, props.firebase.db]);

	return (
		<>
			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							<h4 className='card-title'>{post.data.title}</h4>
							<p>{post.user.username}</p>
							<p>{post.data.content}</p>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-12'>
					<AddComment />
				</div>
			</div>
		</>
	);
};

export default withFirebase(Topic);
