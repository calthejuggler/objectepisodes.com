import React, { useLayoutEffect, useState, useMemo } from 'react';
import { withFirebase } from '../../../Firebase/context';
import AddComment from './AddComment';
import LikeButton from './LikeButton';
import ProfilePicture from '../../../elements/ProfilePicture';
import { Slate, withReact, Editable } from 'slate-react';
import { createEditor } from 'slate';
import RichTextView from '../../../elements/RichTextView';

const Topic = props => {
	const { firebase, currentTopic, currentCategory, setTitle } = props;

	const [post, setPost] = useState(null);

	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(true);

	useLayoutEffect(() => {
		return firebase.db
			.collection('forum')
			.doc(currentTopic)
			.onSnapshot(topicSnap => {
				setPost(null);
				firebase
					.getUserDataFromUID(topicSnap.data().user.trim())
					.then(topicUserSnap => {
						setTitle(topicSnap.data().title);
						setPost({
							data: topicSnap.data(),
							user: topicUserSnap.data(),
							id: topicSnap.id,
						});
					})
					.catch(e => console.dir(e.message));
			});
	}, [currentCategory, currentTopic, firebase, setTitle]);

	useLayoutEffect(() => {
		return firebase.db
			.collection('forum-replies')
			.where('topicID', '==', currentTopic)
			.orderBy('timestamp', 'desc')
			.onSnapshot(replySnap => {
				setComments([]);
				if (replySnap.empty) {
					setCommentsLoading(false);
				} else {
					replySnap.forEach(reply => {
						firebase
							.getUserDataFromUID(reply.data().user)
							.then(user => {
								setComments(prev => [
									...prev,
									{
										user: user.data(),
										data: reply.data(),
										id: reply.id,
									},
								]);
								setCommentsLoading(false);
							});
					});
				}
			});
	}, [currentTopic, firebase]);

	const editor = useMemo(()=> withReact(createEditor()),[])

	return (
		<>
			<div className='row'>
				<div className='col-12'>
					<h3 className='m-2 text-center text-md-left'>
						Original Post
					</h3>
				</div>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							{!post ? (
								<div className='d-flex justify-content-center'>
									<div
										className='spinner-border mx-auto'
										role='status'>
										<span className='sr-only'>
											Loading...
										</span>
									</div>
								</div>
							) : (
								<div className='row align-items-center'>
									<div className='col-12 col-md-3 text-center'>
										<div className='row align-items-center justify-content-center'>
											<div className='col-6 col-md-12'>
												<ProfilePicture
													userID={post.data.user}
													size={['3rem', '3rem']}
												/>
												<br />
												<a
													href={
														'#/user/' +
														post.user.username
													}>
													{post.user.username}
												</a>
											</div>
											<div className='col-6 col-md-12'>
												<p>
													{post.data.posted
														.toDate()
														.toUTCString()}
												</p>
											</div>
										</div>
									</div>
									<div className='col-12 col-md-7'>
										<RichTextView content={post.data.content} />
										{console.dir(post.data.content)}
										{/* {post.data.content ? (
											<p className='text-center text-md-left'>
												{post.data.content}
											</p>
										) : (
											<p className='text-warning mt-3'>
												This post has no text...
											</p>
										)} */}
									</div>
									<div className='col-12 col-md-2'>
										<LikeButton
											postID={post.id}
											likes={post.data.likes}
											type='post'
											size={3}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='col-12'>
					<h3 className='m-2 text-center text-md-left'>
						Recent Comments <small>(Date - desc.)</small>
					</h3>
				</div>
				{commentsLoading ? (
					<div className='col-12 mt-1'>
						<div className='card'>
							<div className='d-flex justify-content-center'>
								<div
									className='spinner-border mx-auto'
									role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							</div>
						</div>
					</div>
				) : comments.length === 0 ? (
					<div className='col-12 mt-1'>
						<div className='card'>
							<div className='card-body'>
								<p>
									There are no comments. Be the first to add
									one!
								</p>
							</div>
						</div>
					</div>
				) : (
					comments.map(comment => (
						<div className='col-12 mt-1' key={comment.id}>
							<div className='card'>
								<div className='card-body'>
									<div className='row align-items-center'>
										<div className='col-12 col-md-3 text-center'>
											<div className='row align-items-center justify-content-center'>
												<div className='col-6 col-md-12'>
													<ProfilePicture
														userID={
															comment.data.user
														}
														size={['3rem', '3rem']}
													/>
													<br />
													<a
														href={
															'#/user/' +
															comment.user
																.username
														}>
														{comment.user.username}
													</a>
												</div>
												<div className='col-6 col-md-12'>
													<p>
														{comment.data.timestamp
															.toDate()
															.toUTCString()}
													</p>
												</div>
											</div>
										</div>
										<div className='col-12 col-md-7'>
											{comment.data.comment ? (
												<p className='text-center text-md-left'>
													{comment.data.comment}
												</p>
											) : (
												<p className='text-warning mt-3'>
													This post has no text...
												</p>
											)}
										</div>
										<div className='col-12 col-md-2'>
											<LikeButton
												postID={comment.id}
												likes={comment.data.likes}
												type='post'
												size={5}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
			<AddComment
				currentCategory={currentCategory}
				currentTopic={currentTopic}
			/>
		</>
	);
};

export default withFirebase(Topic);
