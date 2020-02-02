import React from 'react';
import { withFirebase } from '../../../Firebase/context';
import { useState } from 'react';
import { useEffect } from 'react';

const LikeButton = props => {
	const { firebase, postID, likes, type, size } = props;

	const [colour, setColour] = useState('#000');
	const [userHasLiked, setUserHasLiked] = useState(false);

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

	useEffect(() => {
		if (likes) {
			if (likes.includes(firebase.auth.currentUser.uid)) {
				setColour('#0275d8');
				setUserHasLiked(true);
			} else {
				setColour('#000');
				setUserHasLiked(false);
			}
		}
	}, [likes, firebase.auth.currentUser.uid]);

	return (
		<span
			onClick={handleLikeClick}
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				border: '1px solid ' + colour,
				borderRadius: '0.2rem',
				maxWidth: '3.5rem',
				margin: 'auto',
				paddingTop: '0.2rem',
				color: colour,
				cursor: 'pointer',
			}}
			onMouseEnter={() => setColour('#2497fa')}
			onMouseLeave={() => {
				if (!userHasLiked) {
					setColour('#000');
				} else {
					setColour('#0275d8');
				}
			}}>
			<svg
				id='Layer_1'
				data-name='Layer 1'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 357.35 375.7'
				style={{ width: size + 'rem', fill: colour }}>
				<title>club_icon</title>
				<path d='M168,368.57v-11s0-3,4-4c0,0-1.5-118.5-6.5-148.5l-21-92s-7-23,1-51l3-9,10-32s0-3,4-14c0,0,17-6,31,0l15,47s1,0,3,8,7,24,2,52l-21,91s-6,91-5,149a3.55,3.55,0,0,1,3,2s2,7,0,13C190.47,369.07,178.47,376.07,168,368.57Z' />
				<path d='M124.81,362.36l4.86-9.87s1.32-2.7,5.35-1.83c0,0,50.94-107,59.69-136.13l21.75-91.83s3.86-23.72,23.4-45.32l6.66-6.75,23.09-24.31s1.33-2.69,9.77-10.8c0,0,17.9,2.12,27.82,13.68L299.92,98s.9.44-.84,8.5-4.3,24.62-21.14,47.55l-59,72.39s-45.54,79-70.23,131.51a3.56,3.56,0,0,1,1.81,3.12s-1.29,7.16-5.74,11.66C144.78,372.73,130.93,373.72,124.81,362.36Z' />
				<path d='M233.15,362l-4.86-9.87s-1.32-2.69-5.35-1.82c0,0-50.94-107-59.69-136.13L141.5,122.35S137.64,98.62,118.1,77l-6.66-6.75L88.35,46s-1.33-2.7-9.77-10.8c0,0-17.9,2.11-27.82,13.68L58,97.64s-.9.44.84,8.5,4.3,24.63,21.14,47.55l59,72.4s45.54,79,70.23,131.5a3.58,3.58,0,0,0-1.81,3.12s1.29,7.17,5.74,11.67C213.18,372.38,227,373.37,233.15,362Z' />
			</svg>
			{!likes ? 0 : likes.length}
		</span>
	);
};

export default withFirebase(LikeButton);
