import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../Firebase/context';

const Breadcrumbs = props => {
	const [topicTitle, setTopicTitle] = useState(null);
	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				{props.locationArray.map((loc, i) => {
					if (i === 2) {
						props.firebase.db
							.collection('forum')
							.doc(props.currentCategory)
							.collection('topics')
							.doc(props.currentTopic.trim())
							.get()
							.then(topicSnap => {
								setTopicTitle(topicSnap.data().title);
							});
					}
					return (
						<li
							className={
								i === props.location.length - 1
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
										props.setLocation(['forum']);
										props.setCurrentCategory(null);
										props.setCurrentTopic(null);
									}
									if (i === 1) {
										props.history.replace(
											'/forum/' + props.currentCategory
										);
										props.setLocation([
											'forum',
											props.currentCategory,
										]);
										props.setCurrentTopic(null);
									}
								}}>
								{i === 2 && topicTitle !== null
									? topicTitle[0].toUpperCase() +
									  topicTitle.slice(1)
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
