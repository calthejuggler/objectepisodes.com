import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../Firebase/context';
import CategoryTable from './components/CategoryTable';
import TopicsTable from './components/TopicsTable';
import Breadcrumbs from './components/Breadcrumbs';
import Topic from './components/Topic';

const Forum = props => {
	const { firebase } = props;

	const [categories, setCategories] = useState([]);
	const [currentCategory, setCurrentCategory] = useState(null);
	const [currentTopic, setCurrentTopic] = useState(null);
	const [location, setLocation] = useState(['forum']);

	const [title, setTitle] = useState(['Loading Forum...']);

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
			.then(categoriesSnap => {
				categoriesSnap.forEach(categorySnap =>
					setCategories(prev => [...prev, categorySnap])
				);
			});
		setLocation(locationArray);
	}, [firebase, props.history]);

	return (
		<div className='row'>
			<div className='col-12'>
				<Breadcrumbs
					locationArray={location}
					setLocation={setLocation}
					setCurrentCategory={setCurrentCategory}
					setCurrentTopic={setCurrentTopic}
					currentCategory={currentCategory}
					currentTopic={currentTopic}
					title={title}
					setTitle={setTitle}
				/>
				<h1 className='text-center'>{title}</h1>
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
						setLocation={setLocation}
						setTitle={setTitle}
					/>
				) : !currentTopic ? (
					<TopicsTable
						setTitle={setTitle}
						setLocation={setLocation}
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

export default withFirebase(Forum);
