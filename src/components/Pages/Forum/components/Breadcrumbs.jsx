import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../Firebase/context';

const Breadcrumbs = props => {
	const {
		locationArray,
		firebase,
		currentCategory,
		currentTopic,
		location,
		setLocation,
		setCurrentTopic,
		setCurrentCategory,
		title,
		setTitle,
	} = props;

	const [topicTitle, setTopicTitle] = useState(null);
	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				{locationArray.map((loc, i) => {
					if (i === 2) {
						firebase
							.getForumPostFromTopic(
								currentCategory,
								currentTopic
							)
							.then(topicSnap => {
								setTopicTitle(topicSnap.data().title);
								setTitle(topicSnap.data().title)
							});
					}
					return (
						<li
							className={
								i === location.length - 1
									? 'breadcrumb-item active'
									: 'breadcrumb-item'
							}
							aria-current='page'
							key={loc}>
							<button
								className={
									i === 2
										? 'btn btn-link disabled'
										: 'btn btn-link'
								}
								onClick={() => {
									if (i === 0) {
										props.history.replace('/forum');
										setLocation(['forum']);
										setCurrentCategory(null);
										setCurrentTopic(null);
									}
									if (i === 1) {
										props.history.replace(
											'/forum/' + currentCategory
										);
										setLocation(['forum', currentCategory]);
										setCurrentTopic(null);
									}
								}}>
								{i === 2
									? topicTitle
										? topicTitle[0].toUpperCase() +
										  topicTitle.slice(1)
										: 'Loading topic title...'
									: loc[0].toUpperCase() + loc.slice(1)}
							</button>
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default withFirebase(withRouter(Breadcrumbs));
