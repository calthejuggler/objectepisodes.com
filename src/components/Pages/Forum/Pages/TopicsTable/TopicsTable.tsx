import React, {
	useLayoutEffect,
	useState,
	FC,
	Dispatch,
	SetStateAction
} from 'react';
import { withFirebase } from '../../../../Firebase/context';
import AddTopic from './components/AddTopic';
import TopicRow from './components/TopicRow';
import ItemsPerPage from '../../components/ItemsPerPage';
import Firebase from './../../../../Firebase/index';

interface Props {
	firebase: Firebase;
	currentCategory: string | null;
	setCurrentTopic: Dispatch<SetStateAction<string | null>>;
	setLocationArray: Dispatch<SetStateAction<Array<string | null>>>;
	setTitle: Dispatch<SetStateAction<string | null>>;
}

const TopicsTable: FC<Props> = props => {
	const {
		firebase,
		currentCategory,
		setCurrentTopic,
		setLocationArray,
		setTitle
	} = props;

	const [topics, setTopics] = useState<Array<{ thread: any; user: any }>>([]);
	const [topicLoading, setTopicLoading] = useState(true);

	const [page, setPage] = useState(0);
	const [lastPage, setLastPage] = useState(0);
	const [topicsPerPage, setTopicsPerPage] = useState(5);
	const [lastTopicVisible, setLastTopicVisible] = useState(null);
	const [firstTopicVisible, setFirstTopicVisible] = useState(null);

	useLayoutEffect(() => {
		setTitle(currentCategory);
		firebase.db
			.collection('forum')
			.where('category', '==', currentCategory)
			.get()
			.then((topicCountSnap: any) => {
				const pages = Math.floor(
					topicCountSnap.docs.length / topicsPerPage
				);
				setLastPage(pages);
			});
		return firebase.db
			.collection('forum')
			.where('category', '==', currentCategory)
			.orderBy('posted', 'desc')
			.limit(topicsPerPage)
			.onSnapshot((topicsSnap: any) => {
				setLastTopicVisible(
					topicsSnap.docs[topicsSnap.docs.length - 1]
				);
				setFirstTopicVisible(topicsSnap.docs[0]);
				if (topicsSnap.empty) {
					setTopicLoading(false);
				} else {
					setTopics([]);
					topicsSnap.forEach((topicDoc: any) => {
						firebase
							.getUserDataFromUID(topicDoc.data().user)
							.then(userDoc => {
								setTopics(prev => [
									...prev,
									{ thread: topicDoc, user: userDoc }
								]);
								setTopicLoading(false);
							});
					});
				}
			});
	}, [currentCategory, firebase, topicsPerPage, setTitle]);

	const loadNextTopics = () => {
		setTopicLoading(true);
		setPage(prev => prev + 1);
		return firebase.db
			.collection('forum')
			.where('category', '==', currentCategory)
			.orderBy('posted', 'desc')
			.startAfter(lastTopicVisible)
			.limit(topicsPerPage)
			.onSnapshot((topicsSnap: any) => {
				setLastTopicVisible(
					topicsSnap.docs[topicsSnap.docs.length - 1]
				);
				setFirstTopicVisible(topicsSnap.docs[0]);
				if (topicsSnap.empty) {
					setTopicLoading(false);
				} else {
					setTopics([]);
					topicsSnap.forEach((topicDoc: any) => {
						firebase
							.getUserDataFromUID(topicDoc.data().user)
							.then(userDoc => {
								setTopics(prev => [
									...prev,
									{ thread: topicDoc, user: userDoc }
								]);
								setTopicLoading(false);
							});
					});
				}
			});
	};
	const loadPrevTopics = () => {
		setTopicLoading(true);
		setPage(prev => prev - 1);
		return firebase.db
			.collection('forum')
			.where('category', '==', currentCategory)
			.orderBy('posted', 'desc')
			.endBefore(firstTopicVisible)
			.limit(topicsPerPage)
			.onSnapshot((topicsSnap: any) => {
				setLastTopicVisible(
					topicsSnap.docs[topicsSnap.docs.length - 1]
				);
				setFirstTopicVisible(topicsSnap.docs[0]);
				if (topicsSnap.empty) {
					setTopicLoading(false);
				} else {
					setTopics([]);
					topicsSnap.forEach((topicDoc: any) => {
						firebase
							.getUserDataFromUID(topicDoc.data().user)
							.then(userDoc => {
								setTopics(prev => [
									...prev,
									{ thread: topicDoc, user: userDoc }
								]);
								setTopicLoading(false);
							});
					});
				}
			});
	};

	return (
		<>
			<div className='row justify-content-between align-items-center'>
				<div className='col-6'>
					<AddTopic currentCategory={currentCategory} />
				</div>
				<div className='col-6 text-right'>
					<ItemsPerPage
						currentItemsPerPage={topicsPerPage}
						setLoadingState={setTopicLoading}
						setItemsPerPage={setTopicsPerPage}
					/>
				</div>
			</div>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item'>
					<div className='row align-items-center'>
						<div className='col-4 col-sm-3'>
							<b>Title</b>
						</div>
						<div className='col-4 col-sm-2'>
							<b>By</b>
						</div>
						<div className='col-3 d-none d-sm-block'>
							<b>Date</b>
						</div>
						<div className='col-3 d-none d-sm-block'>
							<b>Last Post</b>
						</div>
						<div className='col-4 col-sm-1'>
							<b>Likes</b>
						</div>
					</div>
				</li>
				{!topicLoading ? (
					topics.length !== 0 ? (
						topics.map(topic => (
							<TopicRow
								key={topic.thread.id}
								id={topic.thread.id}
								title={topic.thread.data().title}
								username={topic.user.data().username}
								posted={topic.thread.data().posted.toDate()}
								lastPost={topic.thread.data().lastPost.toDate()}
								currentCategory={currentCategory}
								setCurrentTopic={setCurrentTopic}
								setLocationArray={setLocationArray}
								photoURL={topic.user.data().photoURL}
								likes={topic.thread.data().likes}
							/>
						))
					) : (
						<li className='list-group-item'>
							<div className='row'>
								<div className='col-12'>
									<p>
										There are no topics here yet! Will you
										be the first to post one?
									</p>
								</div>
							</div>
						</li>
					)
				) : (
					<li className='list-group-item'>
						<div className='row'>
							<div className='col-1 mx-auto'>
								<div className='spinner-border' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							</div>
						</div>
					</li>
				)}
				<nav
					aria-label='Page navigation example'
					className='mx-auto my-3'
				>
					<ul className='pagination'>
						{page !== 0 && (
							<li className='page-item'>
								<button
									className={'btn page-link'}
									onClick={loadPrevTopics}
								>
									Prev
								</button>
							</li>
						)}
						{lastPage !== page && (
							<li className='page-item'>
								<button
									className={'btn page-link'}
									onClick={loadNextTopics}
								>
									Next
								</button>
							</li>
						)}
					</ul>
				</nav>
			</ul>
		</>
	);
};

export default withFirebase(TopicsTable);