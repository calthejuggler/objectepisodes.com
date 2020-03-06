import React, { useState, Dispatch, SetStateAction, FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withFirebase } from '../../../Firebase/context';
import Firebase from './../../../Firebase/index';

interface Props extends RouteComponentProps {
	locationArray: Array<string | undefined>;
	firebase: Firebase;
	currentCategory: undefined | string;
	currentTopic: undefined | string;
	setLocationArray: Dispatch<SetStateAction<Array<string | undefined>>>;
	setCurrentTopic: Dispatch<SetStateAction<undefined | string>>;
	setCurrentCategory: Dispatch<SetStateAction<undefined | string>>;
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
							props.history.goBack();
							const prevPage = props.history.location.pathname.split(
								'/'
							);
							const prevPageArray = prevPage.filter(
								value => value !== '' && value
							);
							prevPageArray.pop();
							setLocationArray(prevPageArray);
							if (prevPageArray.length === 1) {
								setCurrentCategory(undefined);
								setCurrentTopic(undefined);
								setTitle('Loading categories...');
							} else {
								setCurrentTopic(undefined);
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
							.then(topicSnap => {
								setTopicTitle(topicSnap.data().title);
								setTitle('Topic');
							});
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
										props.history.replace('/forum');
										setLocationArray(['forum']);
										setCurrentCategory(undefined);
										setCurrentTopic(undefined);
										setTitle('Loading...');
									}
									if (i === 1) {
										props.history.replace(
											'/forum/' + currentCategory
										);
										setLocationArray([
											'forum',
											currentCategory
										]);
										setCurrentTopic(undefined);
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
