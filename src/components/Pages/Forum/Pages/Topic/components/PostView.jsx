import React from 'react';
import ProfilePicture from '../../../../../elements/ProfilePicture';
import RichTextView from '../../../../../elements/RichTextView';
import LikeButton from '../../../../../elements/LikeButton';

const PostView = ({ post }) => {
	return (
		<div className='col-12'>
			<div className='card'>
				<div className='card-body'>
					{!post ? (
						<div className='d-flex justify-content-center'>
							<div
								className='spinner-border mx-auto'
								role='status'>
								<span className='sr-only'>Loading...</span>
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
												'#/user/' + post.user.username
											}>
											{post.user.username}
										</a>
									</div>
									<div className='col-6 col-md-12'>
										<p>
											{post.data.posted
												? post.data.posted
														.toDate()
														.toUTCString()
												: post.data.timestamp
														.toDate()
														.toUTCString()}
										</p>
									</div>
								</div>
							</div>
							<div className='col-12 col-md-7'>
								<h1>{post.data.title}</h1>
								{post.data.content ? (
									Array.isArray(post.data.content) ? (
										<RichTextView
											content={post.data.content}
										/>
									) : (
										post.data.content
									)
								) : Array.isArray(post.data.comment) ? (
									<RichTextView content={post.data.comment} />
								) : (
									post.data.comment
								)}
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
	);
};

export default PostView;
