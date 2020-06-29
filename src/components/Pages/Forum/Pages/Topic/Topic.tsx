import React, {
	useLayoutEffect,
	useState,
	Dispatch,
	SetStateAction,
	FC,
} from 'react';
import { withFirebase } from '../../../../Firebase/context';

import AddComment from './components/AddComment';
import PostView from './components/PostView';
import Firebase from './../../../../Firebase/index';

interface Props {
	firebase: Firebase;
	currentTopic: undefined | string;
	currentCategory: undefined | string;
	setTitle: Dispatch<SetStateAction<string>>;
}

const Topic: FC<Props> = (props) => {
	const { firebase, currentTopic, currentCategory, setTitle } = props;

	const [post, setPost] = useState<{
		data: any;
		user: any;
		id: string;
	} | null>(null);

	const [comments, setComments] = useState<Array<{
		data: any;
		user: any;
		id: string;
	}> | null>(null);
	const [commentsLoading, setCommentsLoading] = useState(true);

	useLayoutEffect(() => {
		return firebase.db
			.collection('forum')
			.doc(currentTopic)
			.onSnapshot((topicSnap: any) => {
				setPost(null);

				setTitle(topicSnap.data().title);
				setPost({
					data: topicSnap.data(),
					user: topicSnap.data().user,
					id: topicSnap.id,
				});
			});
	}, [currentCategory, currentTopic, firebase, setTitle]);

	useLayoutEffect(() => {
		return firebase.db
			.collection('forum-replies')
			.where('topicID', '==', currentTopic)
			.orderBy('timestamp', 'desc')
			.onSnapshot((replySnap: any) => {
				setComments([]);
				if (replySnap.empty) {
					setCommentsLoading(false);
				} else {
					replySnap.forEach((reply: any) => {
						setComments((prev) => [
							...prev,
							{
								user: reply.data().user,
								data: reply.data(),
								id: reply.id,
							},
						]);
						setCommentsLoading(false);
					});
				}
			});
	}, [currentTopic, firebase]);

	return (
		<>
			<div className='row justify-content-center'>
				<PostView post={post} collection='forum' index={0} />
				<div className='col-12 col-lg-8'>
					<h2 className='text-center'>Comments</h2>
				</div>
				{commentsLoading ? (
					<div className='col-12 col-lg-8 mt-1'>
						<div className='card'>
							<div className='d-flex justify-content-center'>
								<div
									className='spinner-border mx-auto'
									role='status'
								>
									<span className='sr-only'>Loading...</span>
								</div>
							</div>
						</div>
					</div>
				) : comments !== null && comments.length === 0 ? (
					<div className='col-12 col-lg-8 mt-1'>
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
					comments !== null &&
					comments.map((comment, i) => (
						<PostView
							post={comment}
							key={comment.id}
							collection='forum-replies'
							index={i + 1}
						/>
					))
				)}
				<div className='col-12 col-lg-8'>
					<AddComment
						currentCategory={currentCategory}
						currentTopic={currentTopic}
					/>
				</div>
			</div>
		</>
	);
};

export default withFirebase(Topic);
