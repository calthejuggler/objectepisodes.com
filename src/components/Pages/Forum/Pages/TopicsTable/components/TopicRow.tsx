import React, { Dispatch, SetStateAction, FC, Ref } from 'react';
import LikeButton from '../../../../../elements/LikeButton';

interface Props {
	id: string;
	thread: firebase.firestore.DocumentData;
	user: firebase.firestore.DocumentData;
	currentCategory: string | null;
	setCurrentTopic: Dispatch<SetStateAction<string | null>>;
	setLocationArray: Dispatch<SetStateAction<Array<string | null>>>;
	lastTopicRef?: Ref<HTMLLIElement>;
}

const TopicRow: FC<Props> = (props) => {
	const {
		id,
		currentCategory,
		setCurrentTopic,
		setLocationArray,
		lastTopicRef,
	} = props;

	const { title, posted, lastPost, likes } = props.thread?.data();

	const { username, photoURL } = props.user;

	return (
		<li
			ref={lastTopicRef ? lastTopicRef : undefined}
			className='list-group-item'
		>
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
						{posted.toDate().toDateString() ===
						new Date().toDateString()
							? 'Today - ' + posted.toDate().toTimeString()
							: posted.toDate().toUTCString()}
					</p>
				</div>
				<div className='col-3 d-none d-sm-block'>
					<p>
						{lastPost.toDate().toDateString() ===
						new Date().toDateString()
							? 'Today - ' + lastPost.toDate().toTimeString()
							: lastPost.toDate().toUTCString()}
					</p>
				</div>
				<div className='col-4 col-sm-1'>
					<LikeButton
						postID={id}
						likes={likes}
						type='post'
						size={2}
					/>
				</div>
			</div>
		</li>
	);
};

export default TopicRow;
