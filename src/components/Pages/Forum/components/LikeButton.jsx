import React from 'react';
import { withFirebase } from '../../../Firebase/context';

const LikeButton = props => {
	const { firebase, postID, likes, type, currentCategory } = props;

	const handleLikeClick = e => {
		e.preventDefault();
		if (type === 'post') {
			firebase.db
				.collection('forum')
				.doc(currentCategory)
				.collection('topics')
				.doc(postID)
				.update({ likes: firebase.dbFunc.FieldValue.increment(1) });
		} else {
			firebase.db
				.collection('forum-replies')
				.doc(postID)
				.update({ likes: firebase.dbFunc.FieldValue.increment(1) });
		}
	};

	return (
		<button onClick={handleLikeClick}>
			^<br />
			{!likes ? '0' : likes}
		</button>
	);
};

export default withFirebase(LikeButton);
