import React, { useLayoutEffect, useState, useEffect } from 'react';
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
		props.firebase.db
			.collection('forum')
			.get()
			.then(snap =>
				snap.forEach(category => {
					setCategories(prev => [...prev, category.ref.id]);
				})
			);
		setLocation(props.history.location.pathname.slice(1).split('/'));
		return () => {
			setLocation(['forum']);
			setCategories([]);
		};
	}, [props.firebase, props.history]);
	useEffect(() => {
		if (location[1]) setCurrentCategory(location[1]);
		if (location[2]) setCurrentTopic(location[2]);
		return () => {
			setCurrentCategory(null);
		};
	}, [location]);
	return (
		<div className='row'>
			<div className='col-12'>
				<div className='card'>
					<div className='card-body'>
						<h3 className='text-center'>Forum</h3>
						<Breadcrumbs
							locationArray={location}
							setCurrentCategory={setCurrentCategory}
							setCurrentTopic={setCurrentTopic}
							currentCategory={currentCategory}
						/>
						{!currentCategory ? (
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
