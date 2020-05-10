import React, { FC, Dispatch, SetStateAction,  } from 'react';
import { checkStringForSearchAndBuild } from './../../../../functions/_checkStringForSearchAndBuild';

interface Props {
	propData: firebase.firestore.DocumentData;
	currentView: string;
	setCurrentView: Dispatch<SetStateAction<string>>;
	currentSearch: string;
}

const ItemCard: FC<Props> = ({
	propData,
	currentView,
	setCurrentView,
	currentSearch,
	children,
}) => {
	return (
		<div className='col-12 my-3 col-sm-6 col-md-4 col-lg-3'>
			{currentView === 'database' ? (
				propData.name && (
					<div className='card'>
						<div className='card-body text-center'>
							<button
								className='btn btn-link'
								onClick={(e) => {
									e.preventDefault();
									setCurrentView(propData.name);
								}}
							>
								{propData.name[0].toUpperCase() +
									propData.name.slice(1)}
							</button>
						</div>
					</div>
				)
			) : (
				<div className='card'>
					{propData.photoURL && (
						<img
							src={propData.photoURL}
							alt={propData.Title}
							className='card-img-top'
						/>
					)}
					<div className='card-body'>
						<h5 className='card-title text-center'>
							{checkStringForSearchAndBuild(
								propData.Title,
								currentSearch
							)}
						</h5>
						{children}
						<p className='card-text'>
							{checkStringForSearchAndBuild(
								propData.Description,
								currentSearch
							)}
						</p>
					</div>
					{checkStringForSearchAndBuild(
						propData.title,
						currentSearch
					)}
				</div>
			)}
		</div>
	);
};

export default ItemCard;
