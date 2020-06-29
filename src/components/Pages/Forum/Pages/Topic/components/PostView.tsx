import React, { FC, useState, useEffect } from 'react';
import ProfilePicture from '../../../../../elements/ProfilePicture';
import RichTextView from '../../../../../elements/RichTextView';
import LikeButton from '../../../../../elements/LikeButton';
import { withAuth } from '../../../../../Session';
import { UserContextInterface } from '../../../../../Session/context';
import EditPost from './EditPost';
import DeletePostButton from './DeletePostButton';

const PostView: FC<{
	post: { data: any; user: any; id: string } | null;
	collection: string;
	user: UserContextInterface;
	index: number;
}> = ({ post, collection, user, index }) => {
	const [hasVideo, setHasVideo] = useState<string | null>(null);

	const isVideoLink = (link: string): boolean => {
		var pattern = new RegExp(
			/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/
		); // fragment locator
		return pattern.test(link);
	};

	useEffect(() => {
		if (post) {
			const postText = post?.data.comment
				? post.data.comment
				: post?.data.content;
			postText.forEach((element: { type: string; children: any }) => {
				if (element.type === 'link') {
					const linkText = element.children[0].text;
					if (linkText) {
						if (isVideoLink(linkText.trim())) {
							let video_id = linkText.split('v=')[1];
							let ampersandPosition = video_id.indexOf('&');
							if (ampersandPosition !== -1) {
								video_id = video_id.substring(
									0,
									ampersandPosition
								);
							}
							setHasVideo(video_id);
						}
					}
				}
			});
		}
	}, [post]);
	return (
		<div className='col-12 col-lg-8'>
			<div className='card my-3'>
				<div className='card-header'>
					{post && post.data.user && (
						<div className='row align-items-center justify-content-center my-2'>
							<div className='col-3'>
								<ProfilePicture
									photoURL={post.data.user.photoURL}
									size={['3rem', '3rem']}
									centered
								/>
							</div>
							<div className='col-9 text-left'>
								<div className='row'>
									<div className='col-10'>
										<a
											href={
												'#/users/' + post.user.username
											}
										>
											{post.user.name}
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
									{user?.uid === post.user.id &&
										!post.data.deleted && (
											<div className='col-12'>
												<EditPost
													type={
														post.data.comment
															? 'comment'
															: 'topic'
													}
													data={post.data}
													id={post.id}
													index={index}
												/>
												<DeletePostButton
													id={post.id}
													type={
														post.data.comment
															? 'comment'
															: 'topic'
													}
													postUser={post.data.user}
													index={index}
												/>
											</div>
										)}
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
								{hasVideo && (
									<div className='col-12'>
										<div className='embed-responsive embed-responsive-16by9'>
											<iframe
												frameBorder='0'
												allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
												title={hasVideo}
												src={
													'https://www.youtube.com/embed/' +
													hasVideo
												}
												allowFullScreen
												className='embed-responsive-item'
											></iframe>
										</div>
									</div>
								)}
								<div className='col-12'>
									<span
										className={
											post.data.deleted && 'font-italic'
										}
									>
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
									</span>
								</div>
								<div className='col-12 col-lg-5'>
									<LikeButton
										postID={post.id}
										likes={post.data.likes}
										collection={collection}
										size={3}
										noReload
									/>
								</div>
							</div>
						</>
					)}
				</div>
				{post?.data.edited && (
					<div className='card-footer text-center'>
						<small>This post has been edited.</small>
					</div>
				)}
			</div>
		</div>
	);
};

export default withAuth(PostView);
