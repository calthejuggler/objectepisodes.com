import React, {
	FC,
	Dispatch,
	SetStateAction,
	useRef,
	useCallback,
	useReducer,
	useEffect,
} from 'react';
import { withFirebase } from '../../../../Firebase/context';
import AddTopic from './components/AddTopic';
import TopicRow from './components/TopicRow';
import Firebase from './../../../../Firebase/index';

interface Props {
	firebase: Firebase;
	currentCategory: string | null;
	setCurrentTopic: Dispatch<SetStateAction<string | null>>;
	setLocationArray: Dispatch<SetStateAction<Array<string | null>>>;
	setTitle: Dispatch<SetStateAction<string | null>>;
}

interface State {
	topicsLoading: boolean;
	topics: {
		thread: firebase.firestore.DocumentData;
		user: firebase.firestore.DocumentData;
		id: string;
	}[];
	hasMore: boolean;
	error: string | null;
	numberOfRows: number;
}

const initialState = {
	topicsLoading: true,
	topics: [],
	hasMore: true,
	error: null,
	numberOfRows: 10,
};

const TopicsTable: FC<Props> = (props) => {
	const {
		firebase,
		currentCategory,
		setCurrentTopic,
		setLocationArray,
	} = props;

	const topicsReducer = (
		state: State,
		action: { type: string; payload: any }
	): State => {
		switch (action.type) {
			case 'add-topic': {
				if (action.payload) {
					return {
						...state,
						topics: [...state.topics, action.payload],
					};
				}
				break;
			}
			case 'empty-topics': {
				return {
					...state,
					hasMore: true,
					topicsLoading: true,
					topics: [],
					error: null,
				};
			}
			case 'no-more-topics': {
				return { ...state, topicsLoading: false, hasMore: false };
			}
			case 'set-loading': {
				return { ...state, topicsLoading: action.payload };
			}
			case 'error': {
				return { ...state, error: action.payload };
			}
			default:
				return state;
		}
		return state;
	};

	const [{ topicsLoading, topics, hasMore, error }, dispatch] = useReducer(
		topicsReducer,
		initialState
	);

	const numberOfRows = useRef<number>(10);

	useEffect(() => {
		firebase.db
			.collection('forum')
			.where('category', '==', currentCategory)
			.orderBy('lastPost', 'desc')
			.limit(numberOfRows.current)
			.get()
			.then((snap: firebase.firestore.QuerySnapshot) => {
				if (snap.empty || snap.docs.length < 10) {
					dispatch({ type: 'no-more-topics', payload: null });
				}
				snap.docs.forEach((doc, i) => {
					firebase
						.getUserDataFromUID(doc.data().user)
						.then((userSnap) => {
							dispatch({
								type: 'add-topic',
								payload: {
									thread: doc,
									user: userSnap.data(),
									id: doc.id,
								},
							});
							if (snap.docs.length - 1)
								dispatch({
									type: 'set-loading',
									payload: false,
								});
						})
						.catch((e: Error) => {
							dispatch({
								type: 'error',
								payload: e.message,
							});
						});
				});
			});
	}, [currentCategory, firebase]);

	const loadMoreTopics = useCallback(() => {
		if (hasMore) {
			dispatch({
				type: 'set-loading',
				payload: true,
			});
			return firebase.db
				.collection('forum')
				.where('category', '==', currentCategory)
				.orderBy('lastPost', 'desc')
				.limit(10)
				.startAfter(topics[topics.length - 1].thread)
				.get()
				.then((snap: firebase.firestore.QuerySnapshot) => {
					if (snap.empty || snap.docs.length < 10) {
						dispatch({ type: 'no-more-topics', payload: null });
					}
					snap.docs.forEach((doc, i) => {
						firebase
							.getUserDataFromUID(doc.data().user)
							.then((userSnap) => {
								numberOfRows.current += 1;
								dispatch({
									type: 'add-topic',
									payload: {
										thread: doc,
										user: userSnap.data(),
										id: doc.id,
									},
								});
								if (snap.docs.length - 1 === i) {
									dispatch({
										type: 'set-loading',
										payload: false,
									});
								}
							})
							.catch((e: Error) => {
								dispatch({
									type: 'error',
									payload: e.message,
								});
							});
					});
				});
		}
	}, [currentCategory, firebase, topics, hasMore]);
	const observer = useRef<IntersectionObserver>();

	const lastTopic = useCallback(
		(node) => {
			if (topicsLoading) return null;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					loadMoreTopics();
				}
			});
			if (node) observer.current.observe(node);
		},
		[topicsLoading, hasMore, loadMoreTopics]
	);

	return (
		<>
			<div className='row justify-content-between align-items-center'>
				<div className='col-6'>
					<AddTopic currentCategory={currentCategory} />
				</div>
				{error && (
					<div className='col-6'>
						<div className='alert alert-danger'>{error}</div>
					</div>
				)}
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
				{topics !== [] ? (
					topics.map(
						(topic: firebase.firestore.DocumentData, i: number) => {
							if (topics.length === i + 1) {
								return (
									<TopicRow
										key={topic.id}
										id={topic.id}
										lastTopicRef={lastTopic}
										thread={topic.thread}
										user={topic.user}
										currentCategory={currentCategory}
										setCurrentTopic={setCurrentTopic}
										setLocationArray={setLocationArray}
										dispatch={dispatch}
									/>
								);
							} else
								return (
									<TopicRow
										key={topic.id}
										id={topic.id}
										thread={topic.thread}
										user={topic.user}
										currentCategory={currentCategory}
										setCurrentTopic={setCurrentTopic}
										setLocationArray={setLocationArray}
									/>
								);
						}
					)
				) : (
					<li className='list-group-item'>
						<div className='row'>
							<div className='col-12'>
								<p>
									There are no topics here yet! Will you be
									the first to post one?
								</p>
							</div>
						</div>
					</li>
				)}
				{topicsLoading && (
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
			</ul>
		</>
	);
};

export default withFirebase(TopicsTable);
