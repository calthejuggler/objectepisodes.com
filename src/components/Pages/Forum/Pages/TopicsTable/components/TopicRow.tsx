import React, { Dispatch, SetStateAction, FC } from 'react';
import LikeButton from '../../../../../elements/LikeButton';

interface Props {
	id: string;
	title: string;
	username: string;
	posted: Date;
	lastPost: Date;
	currentCategory: string | null;
	setCurrentTopic: Dispatch<SetStateAction<string | null>>;
	setLocationArray: Dispatch<SetStateAction<Array<string | null>>>;
	photoURL: string;
	likes: number;
}

const TopicRow: FC<Props> = props => {
	const {
		id,
		title,
		username,
		posted,
		lastPost,
		currentCategory,
		setCurrentTopic,
		setLocationArray,
		photoURL,
		likes
	} = props;
	return (
		<li className='list-group-item'>
			<div className='row align-items-center'>
				<div className='col-4 col-sm-3'>
					<button
						className='btn btn-link'
						onClick={() => {
							setCurrentTopic(id);
							setLocationArray(['forum', currentCategory, id]);
						}}
					>
						{title}
					</button>
				</div>
				<div className='col-4 col-sm-2'>
					<a
						href={'#/user/' + username}
						className='row align-items-center justify-content-left'
					>
						<img
							className='rounded-circle d-block mr-lg-3'
							style={{
								objectFit: 'cover',
								width: '40px',
								height: '40px',
								margin: '0.15rem'
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
					<LikeButton
						postID={id}
						likes={likes}
						type='post'
						size={3}
					/>
				</div>
			</div>
		</li>
	);
};

export default TopicRow;
