import React, { useLayoutEffect, useState, FC } from 'react';
import { withFirebase } from '../../Firebase/context';

import CategoryTable from './Pages/CategoryTable';
import TopicsTable from './Pages/TopicsTable/TopicsTable';
import Topic from './Pages/Topic/Topic';

import Breadcrumbs from './components/Breadcrumbs';
import Firebase from './../../Firebase/index';
import { withRouter } from 'react-router-dom';

interface Props {
	firebase: Firebase;
}

const Forum: FC<Props> = props => {
	const { firebase } = props;

	const [categories, setCategories] = useState<string[]>([]);
	const [currentCategory, setCurrentCategory] = useState<null | string>(null);
	const [currentTopic, setCurrentTopic] = useState<null | string>(null);
	const [locationArray, setLocationArray] = useState<string[]>([
		'forum'
	]);

	const [title, setTitle] = useState('Loading...');

	useLayoutEffect(() => {
		firebase.db
			.collection('forum-categories')
			.get()
			.then((categoriesSnap: any) => {
				categoriesSnap.forEach((categorySnap: any) =>
					setCategories(prev => [...prev, categorySnap])
				);
			});
	}, [firebase]);

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
