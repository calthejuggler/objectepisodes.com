import React, { Dispatch, SetStateAction, FC, Ref } from 'react';
import LikeButton from '../../../../../elements/LikeButton';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ProfilePicture from '../../../../../elements/ProfilePicture';

interface Props extends RouteComponentProps {
	id: string;
	thread: firebase.firestore.DocumentData;
	currentCategory: string | null;
	setCurrentTopic: Dispatch<SetStateAction<string | null>>;
	setLocationArray: Dispatch<SetStateAction<Array<string | null>>>;
	lastTopicRef?: Ref<HTMLLIElement>;
	dispatch?: Dispatch<{ type: string; payload: any }>;
}

const TopicRow: FC<Props> = (props) => {
	const {
		id,
		currentCategory,
		setCurrentTopic,
		setLocationArray,
		lastTopicRef,
		dispatch,
		history,
	} = props;

	const { title, posted, lastPost, likes } = props.thread?.data();

	const { name, photoURL } = props.thread?.data().user;

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
							history.replace(currentCategory + '/' + id);
							setCurrentTopic(id);
							setLocationArray(['forum', currentCategory, id]);
						}}
					>
						{title}
					</button>
				</div>
				<div className='col-4 col-sm-2'>
					<a
						href={'#/users/' + props.thread?.data().user.username}
						className='row align-items-center justify-content-left'
					>
						<span className='mr-2'>
							<ProfilePicture
								userID={
									!photoURL
										? props.thread?.data().user.id
										: undefined
								}
								photoURL={photoURL ? photoURL : undefined}
								size={['2rem', '2rem']}
							/>
						</span>
						{name}
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
						collection='forum'
						size={2}
						dispatch={dispatch}
						noReload
					/>
				</div>
			</div>
		</li>
	);
};

export default withRouter(TopicRow);
