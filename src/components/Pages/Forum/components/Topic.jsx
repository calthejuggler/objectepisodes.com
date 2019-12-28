import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';

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
		<div className='row'>
			<div className='col-12'>
				<div className='card'>
					<div className='card-header'>{post.user.username}</div>
					<div className='card-body'>{post.data.content}</div>
				</div>
			</div>
		</div>
	);
};

export default withFirebase(Topic);
