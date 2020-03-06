import React, { useLayoutEffect, useState, FC } from 'react';
import { withFirebase } from '../../Firebase/context';

import CategoryTable from './Pages/CategoryTable';
import TopicsTable from './Pages/TopicsTable/TopicsTable';
import Topic from './Pages/Topic/Topic';

import Breadcrumbs from './components/Breadcrumbs';
import Firebase from './../../Firebase/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
	firebase: Firebase;
}

const Forum: FC<Props> = props => {
	const { firebase } = props;

	const [categories, setCategories] = useState<Array<any>>([]);
	const [currentCategory, setCurrentCategory] = useState<undefined | string>(
		undefined
	);
	const [currentTopic, setCurrentTopic] = useState<undefined | string>(
		undefined
	);
	const [locationArray, setLocationArray] = useState<
		Array<string | undefined>
	>(['forum']);

	const [title, setTitle] = useState('Loading...');

	useLayoutEffect(() => {
		let locationArray = props.history.location.pathname.slice(1).split('/');
		if (locationArray.length === 3) {
			setCurrentCategory(locationArray[1]);
			setCurrentTopic(locationArray[2]);
		} else if (locationArray.length === 2)
			setCurrentCategory(locationArray[1]);
		firebase.db
			.collection('forum-categories')
			.get()
			.then((categoriesSnap: any) => {
				categoriesSnap.forEach((categorySnap: any) =>
					setCategories(prev => [...prev, categorySnap])
				);
			});
		setLocationArray(locationArray);
	}, [firebase, props.history]);

	return (
		<div className='row mb-3'>
			<div className='col-12'>
				<Breadcrumbs
					locationArray={locationArray}
					setLocationArray={setLocationArray}
					setCurrentCategory={setCurrentCategory}
					setCurrentTopic={setCurrentTopic}
					currentCategory={currentCategory}
					currentTopic={currentTopic}
					setTitle={setTitle}
				/>
				<h1 className='text-center'>{title}</h1>
				<hr />
				{categories.length === 0 &&
				!currentCategory &&
				!currentTopic ? (
					<div className='d-flex justify-content-center'>
						<div className='spinner-border mx-auto' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					</div>
				) : !currentCategory ? (
					<CategoryTable
						categories={categories}
						setCurrentCategory={setCurrentCategory}
						setLocationArray={setLocationArray}
						setTitle={setTitle}
					/>
				) : !currentTopic ? (
					<TopicsTable
						setTitle={setTitle}
						setLocationArray={setLocationArray}
						currentCategory={currentCategory}
						setCurrentTopic={setCurrentTopic}
					/>
				) : (
					<Topic
						setTitle={setTitle}
						currentTopic={currentTopic}
						currentCategory={currentCategory}
					/>
				)}
			</div>
		</div>
	);
};

export default withRouter(withFirebase(Forum));
