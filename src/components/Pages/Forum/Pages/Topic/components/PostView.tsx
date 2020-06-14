import React, { FC } from 'react';
import ProfilePicture from '../../../../../elements/ProfilePicture';
import RichTextView from '../../../../../elements/RichTextView';
import LikeButton from '../../../../../elements/LikeButton';

const PostView: FC<{ post: { data: any; user: any; id: string } | null }> = ({
	post,
}) => {
	return (
		<div className='col-12 col-lg-8'>
			<div className='card my-3'>
				<div className='card-header'>
					{post && (
						<div className='row align-items-start justify-content-center my-2'>
							<div className='col-3 col-sm-2'>
								<ProfilePicture
									userID={post.data.user}
									size={['3rem', '3rem']}
									centered
								/>
							</div>
							<div className='col-9 col-sm-7 col-lg-10 text-left'>
								<div className='row'>
									<div className='col-12'>
										<a
											href={
												'#/user/' + post.user.username
											}
										>
											{post.user.username}
										</a>
									</div>
								</div>
								<div className='row'>
									<div className='col-12'>
										<small>
											{post.data.posted
												? post.data.posted
														.toDate()
														.toUTCString()
												: post.data.timestamp
														.toDate()
														.toUTCString()}
										</small>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className='card-body'>
					{!post ? (
						<div className='d-flex justify-content-center'>
							<div
								className='spinner-border mx-auto'
								role='status'
							>
								<span className='sr-only'>Loading...</span>
							</div>
						</div>
					) : (
						<>
							<div className='row justify-content-center'>
								<div className='col-12'>
									{post.data.content ? (
										Array.isArray(post.data.content) ? (
											<RichTextView
												content={post.data.content}
											/>
										) : (
											post.data.content
										)
									) : Array.isArray(post.data.comment) ? (
										<RichTextView
											content={post.data.comment}
										/>
									) : (
										post.data.comment
									)}
								</div>
								<div className='col-12 col-lg-5'>
									<LikeButton
										postID={post.id}
										likes={post.data.likes}
										type='post'
										size={3}
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PostView;
