import React from 'react';
import { withFirebase } from '../../../Firebase/context';

const LikeButton = props => {
	const { firebase, postID, likes, type } = props;

	const handleLikeClick = e => {
		e.preventDefault();
		if (likes !== undefined) {
			if (likes.includes(firebase.auth.currentUser.uid)) {
				if (type === 'post') {
					firebase.db
						.collection('forum')
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
		<span
			onClick={handleLikeClick}
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<svg
				id='Layer_1'
				data-name='Layer 1'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 357.35 375.7'
				style={{ width: '3rem' }}>
				<title>club_icon</title>
				<path d='M168,368.57v-11s0-3,4-4c0,0-1.5-118.5-6.5-148.5l-21-92s-7-23,1-51l3-9,10-32s0-3,4-14c0,0,17-6,31,0l15,47s1,0,3,8,7,24,2,52l-21,91s-6,91-5,149a3.55,3.55,0,0,1,3,2s2,7,0,13C190.47,369.07,178.47,376.07,168,368.57Z' />
				<path d='M262.94,372.28l-7.78-7.78s-2.12-2.12,0-5.66c0,0-84.85-82.73-109.6-100.4l-79.9-50.21S44.45,196.92,30.3,171.46L26.06,163,10.5,133.28s-2.12-2.12-7.07-12.73c0,0,7.78-16.26,21.92-21.92l43.84,22.63s.71-.71,7.78,3.53,21.92,12,38.19,35.36l49.49,79.19s60.11,68.59,101.83,108.9a3.53,3.53,0,0,1,3.53-.71s6.37,3.54,9.2,9.19C279.21,356.72,275.67,370.16,262.94,372.28Z' />
				<path d='M78.89,356.2l7.78-7.77s2.12-2.12,5.65,0c0,0,82.74-84.86,100.41-109.61l50.21-79.9s11.31-21.21,36.77-35.35l8.48-4.25,29.7-15.55s2.12-2.12,12.73-7.07c0,0,16.26,7.77,21.92,21.92l-22.63,43.84s.71.7-3.53,7.78-12,21.92-35.36,38.18l-79.19,49.5S143.24,318,102.93,359.74a3.54,3.54,0,0,1,.71,3.54s-3.54,6.36-9.19,9.19C94.45,372.47,81,368.93,78.89,356.2Z' />
			</svg>
			<br />
			{!likes ? 0 : likes.length}
		</span>
	);
};

export default withFirebase(LikeButton);
