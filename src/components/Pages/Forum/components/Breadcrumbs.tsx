import React, { useState, Dispatch, SetStateAction, FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withFirebase } from '../../../Firebase/context';
import Firebase from './../../../Firebase/index';

interface Props extends RouteComponentProps {
	locationArray: string[];
	firebase: Firebase;
	currentCategory: null | string;
	currentTopic: null | string;
	setLocationArray: Dispatch<SetStateAction<string[]>>;
	setCurrentTopic: Dispatch<SetStateAction<string | null>>;
	setCurrentCategory: Dispatch<SetStateAction<string | null>>;
	setTitle: Dispatch<SetStateAction<string>>;
}

const Breadcrumbs: FC<Props> = props => {
	const {
		locationArray,
		firebase,
		currentCategory,
		currentTopic,
		setLocationArray,
		setCurrentTopic,
		setCurrentCategory,
		setTitle
	} = props;

	const [topicTitle, setTopicTitle] = useState<undefined | string>(undefined);
	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				<li className='mr-3 mr-lg-5'>
					<button
						className='btn btn-secondary'
						onClick={() => {
							let shorterLocationArray: string[] = locationArray.slice(
								0,
								-1
							);
							setLocationArray(shorterLocationArray);
							if (shorterLocationArray.length === 1) {
								setCurrentCategory(null);
								setCurrentTopic(null);
								setTitle('Loading categories...');
							} else {
								setCurrentTopic(null);
								setTitle('Loading topics...');
							}
						}}
					>
						Go Back
					</button>
				</li>
				{locationArray.map((loc, i) => {
					if (i === 2) {
						firebase
							.getForumPostFromTopic(currentTopic)
							.then(
								(topicSnap: { data(): { title: string } }) => {
									if (topicSnap) {
										setTopicTitle(topicSnap.data().title);
										setTitle('Topic');
									}
								}
							);
					}
					return (
						<li
							className={
								i === locationArray.length - 1
									? 'breadcrumb-item active'
									: 'breadcrumb-item'
							}
							aria-current='page'
							key={loc}
						>
							<button
								className={
									i === 2
										? 'btn btn-link disabled'
										: 'btn btn-link'
								}
								onClick={() => {
									if (i === 0) {
										setLocationArray(['forum']);
										setCurrentCategory(null);
										setCurrentTopic(null);
										setTitle('Loading...');
									}
									if (i === 1 && currentCategory) {
										setLocationArray([
											'forum',
											currentCategory
										]);
										setCurrentTopic(null);
									}
								}}
							>
								{i === 2
									? topicTitle
										? topicTitle[0].toUpperCase() +
										  topicTitle.slice(1)
										: 'Loading topic title...'
									: loc !== undefined &&
									  loc[0].toUpperCase() + loc.slice(1)}
							</button>
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default withRouter(withFirebase(Breadcrumbs));
