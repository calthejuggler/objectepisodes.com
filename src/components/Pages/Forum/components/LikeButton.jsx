import React from 'react';
import { withFirebase } from '../../../Firebase/context';

const LikeButton = props => {
	const { firebase, postID, likes, type, currentCategory } = props;

	const handleLikeClick = e => {
		e.preventDefault();
		if (likes !== undefined) {
			if (likes.includes(firebase.auth.currentUser.uid)) {
				if (type === 'post') {
					firebase.db
						.collection('forum')
						.doc(currentCategory)
						.collection('topics')
						.doc(postID)
						.update({
							likes: firebase.dbFunc.FieldValue.arrayRemove(
								firebase.auth.currentUser.uid
							),
							likeCount: firebase.dbFunc.FieldValue.increment(-1),
						});
				} else {
					firebase.db
						.collection('forum-replies')
						.doc(postID)
						.update({
							likes: firebase.dbFunc.FieldValue.arrayRemove(
								firebase.auth.currentUser.uid
							),
							likeCount: firebase.dbFunc.FieldValue.increment(-1),
						});
				}
				firebase.db
					.collection('users')
					.doc(firebase.auth.currentUser.uid)
					.update({
						likes: firebase.dbFunc.FieldValue.arrayRemove(postID),
					});
			} else {
				if (type === 'post') {
					firebase.db
						.collection('forum')
						.doc(currentCategory)
						.collection('topics')
						.doc(postID)
						.update({
							likes: firebase.dbFunc.FieldValue.arrayUnion(
								firebase.auth.currentUser.uid
							),
							likeCount: firebase.dbFunc.FieldValue.increment(1),
						});
				} else {
					firebase.db
						.collection('forum-replies')
						.doc(postID)
						.update({
							likes: firebase.dbFunc.FieldValue.arrayUnion(
								firebase.auth.currentUser.uid
							),
							likeCount: firebase.dbFunc.FieldValue.increment(1),
						});
				}
				firebase.db
					.collection('users')
					.doc(firebase.auth.currentUser.uid)
					.update({
						likes: firebase.dbFunc.FieldValue.arrayUnion(postID),
					});
			}
		} else {
			if (type === 'post') {
				firebase.db
					.collection('forum')
					.doc(currentCategory)
					.collection('topics')
					.doc(postID)
					.update({
						likes: [firebase.auth.currentUser.uid],
						likeCount: firebase.dbFunc.FieldValue.increment(1),
					});
			} else {
				firebase.db
					.collection('forum-replies')
					.doc(postID)
					.update({
						likes: [firebase.auth.currentUser.uid],
						likeCount: firebase.dbFunc.FieldValue.increment(1),
					});
			}
			firebase.db
				.collection('users')
				.doc(firebase.auth.currentUser.uid)
				.update({
					likes: firebase.dbFunc.FieldValue.arrayUnion(postID),
				});
		}
	};

	return (
		<button onClick={handleLikeClick}>
			^<br />
			{!likes ? 0 : likes.length}
		</button>
	);
};

export default withFirebase(LikeButton);
