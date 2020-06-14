import React, { useLayoutEffect, useState, SFC } from 'react';
import { withFirebase } from '../../Firebase/context';

import CategoryTable from './Pages/CategoryTable';
import TopicsTable from './Pages/TopicsTable/TopicsTable';
import Topic from './Pages/Topic/Topic';

import Breadcrumbs from './components/Breadcrumbs';
import Firebase from './../../Firebase/index';
import { withRouter, useParams } from 'react-router-dom';

interface Props {
	firebase: Firebase;
}

const Forum: SFC<Props> = (props) => {
	const { firebase } = props;

	let { paramCategory, paramId } = useParams();

	const [categories, setCategories] = useState<string[]>([]);
	const [currentCategory, setCurrentCategory] = useState<null | string>(null);
	const [currentTopic, setCurrentTopic] = useState<null | string>(null);
	const [locationArray, setLocationArray] = useState<string[]>(['forum']);

	const [title, setTitle] = useState('Loading...');

	useLayoutEffect(() => {
		if (paramId && paramCategory) {
			setCurrentTopic(paramId);
			setCurrentCategory(paramCategory);
			setLocationArray(['forum', paramCategory, paramId]);
			console.dir('Yo');
		} else if (paramId) {
			setCurrentTopic(paramId);
			setLocationArray(['forum', '', paramId]);
		} else if (paramCategory) {
			setCurrentCategory(paramCategory);
			setLocationArray(['forum', paramCategory]);
		}
		firebase.db
			.collection('forum-categories')
			.get()
			.then((categoriesSnap: any) => {
				categoriesSnap.forEach((categorySnap: any) =>
					setCategories((prev) => [...prev, categorySnap])
				);
			});
	}, [firebase, paramId, paramCategory]);

	return (
		<div className='row justify-content-center my-3'>
			<div className='col-12 col-lg-8'>
				{locationArray.length !== 1 && (
					<Breadcrumbs
						locationArray={locationArray}
						setLocationArray={setLocationArray}
						setCurrentCategory={setCurrentCategory}
						setCurrentTopic={setCurrentTopic}
						currentCategory={currentCategory}
						currentTopic={currentTopic}
						setTitle={setTitle}
					/>
				)}
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
