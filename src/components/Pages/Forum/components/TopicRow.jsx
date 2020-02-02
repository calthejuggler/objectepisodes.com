import React from 'react';
import { withRouter } from 'react-router-dom';

import LikeButton from './LikeButton';

const TopicRow = props => {
	const {
		id,
		title,
		username,
		posted,
		lastPost,
		currentCategory,
		setCurrentTopic,
		setLocation,
		photoURL,
		likes,
	} = props;
	return (
		<li className='list-group-item'>
			<div className='row align-items-center'>
				<div className='col-4 col-sm-3'>
					<a
						href={'#/forum/' + currentCategory + '/' + id}
						onClick={() => {
							setCurrentTopic(id);
							setLocation(['forum', currentCategory, id]);
						}}>
						{title}
					</a>
				</div>
				<div className='col-4 col-sm-2'>
					<a
						href={'#/user/' + username}
						className='row align-items-center justify-content-left'>
						<img
							className='rounded-circle d-block mr-lg-3'
							style={{
								objectFit: 'cover',
								width: '40px',
								height: '40px',
								margin: '0.15rem',
							}}
							src={photoURL}
							alt='Topic poster profile'
						/>
						{username}
					</a>
				</div>
				<div className='col-3 d-none d-sm-block'>
					<p>
						{posted.toDateString() === new Date().toDateString()
							? 'Today - ' + posted.toTimeString()
							: posted.toUTCString()}
					</p>
				</div>
				<div className='col-3 d-none d-sm-block'>
					<p>
						{lastPost.toDateString() === new Date().toDateString()
							? 'Today - ' + lastPost.toTimeString()
							: lastPost.toUTCString()}
					</p>
				</div>
				<div className='col-4 col-sm-1'>
					<LikeButton postID={id} likes={likes} type='post' size={3} />
				</div>
			</div>
		</li>
	);
};

export default withRouter(TopicRow);
