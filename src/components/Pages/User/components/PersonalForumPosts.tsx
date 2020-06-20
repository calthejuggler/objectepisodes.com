import React, { useEffect, useState, FC } from 'react';
import { withFirebase } from '../../../Firebase/context';
import PersonalForumPostsRow from './PersonalForumPostsRow';
import Firebase from './../../../Firebase/index';

const PersonalForumPosts: FC<{ firebase: Firebase; userData: firebase.firestore.DocumentSnapshot }> = props => {
	const { firebase, userData } = props;
	const [topics, setTopics] = useState<Array<any>>([]);
	const [topicsLoading, setTopicsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (userData?.id) {
			firebase.db
				.collection('forum')
				.where('user', '==', userData.id)
				.orderBy('posted', 'desc')
				.limit(12)
				.get()
				.then((topicsSnap: any) => {
					topicsSnap.forEach((topic: any) => {
						setTopics(prev => [...prev, topic]);
					});
					setTopicsLoading(false);
				});
		}
		return () => {
			setTopicsLoading(true);
			setTopics([]);
		};
	}, [firebase.db, userData]);
	return (
		<div className='card mt-3 mt-md-0'>
			<div className='card-body'>
				<h2 className='card-title text-center'>Forum Posts</h2>

				{!topicsLoading ? (
					<ul className='list-group list-group-flush'>
						<li className='list-group-item'>
							<div className='row'>
								<div className='col-4'>
									<b>Title</b>
								</div>
								<div className='col-4'>
									<b>Date</b>
								</div>
								<div className='col-4'>
									<b>Last Post</b>
								</div>
							</div>
						</li>
						{topics.map(topic => (
							<PersonalForumPostsRow
								key={topic.id}
								topicData={topic}
								category={topic.data().category}
							/>
						))}
					</ul>
				) : (
					<div className='d-flex justify-content-center'>
						<div className='spinner-border mx-auto' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default withFirebase(PersonalForumPosts);
