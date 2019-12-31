import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../Firebase/context';
import CategoryTable from './components/CategoryTable';
import TopicsTable from './components/TopicsTable';
import Breadcrumbs from './components/Breadcrumbs';
import Topic from './components/Topic';

const Forum = props => {
	const [categories, setCategories] = useState([]);
	const [currentCategory, setCurrentCategory] = useState(null);
	const [currentTopic, setCurrentTopic] = useState(null);
	const [location, setLocation] = useState(['forum']);

	useLayoutEffect(() => {
		let locationArray = props.history.location.pathname.slice(1).split('/');
		if (locationArray.length === 3) {
			setCurrentCategory(locationArray[1])
			setCurrentTopic(locationArray[2])
		} else if (locationArray.length === 2) setCurrentCategory(locationArray[1])
		if (locationArray.length === 1) {
			props.firebase.db.collection("forum").get().then(categoriesSnap => {
				categoriesSnap.forEach(categorySnap => setCategories(prev => [...prev,categorySnap.id]))
			})
		}
		setLocation(locationArray);
	}, [props.firebase, props.history]);

	return (
		<div className='row'>
			<div className='col-12'>
				<div className='card'>
					<div className='card-body'>
						<h3 className='text-center'>Forum</h3>
						<Breadcrumbs
							locationArray={location}
							setLocation={setLocation}
							setCurrentCategory={setCurrentCategory}
							setCurrentTopic={setCurrentTopic}
							currentCategory={currentCategory}
							currentTopic={currentTopic}
						/>
						{categories.length === 0 && !currentCategory ? (
							<div className='d-flex justify-content-center'>
								<div
									className='spinner-border mx-auto'
									role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							</div>
						) : !currentCategory ? (
							<CategoryTable
								categories={categories}
								setCurrentCategory={setCurrentCategory}
								setLocation={setLocation}
							/>
						) : !currentTopic ? (
							<TopicsTable
								setLocation={setLocation}
								currentCategory={currentCategory}
								setCurrentTopic={setCurrentTopic}
							/>
						) : (
							<Topic
								currentTopic={currentTopic}
								currentCategory={currentCategory}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withFirebase(Forum);
