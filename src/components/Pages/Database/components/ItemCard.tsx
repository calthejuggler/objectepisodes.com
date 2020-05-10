import React, { FC, Dispatch, SetStateAction, ReactFragment } from 'react';

interface Props {
	propData: firebase.firestore.DocumentData;
	currentView: string;
	setCurrentView: Dispatch<SetStateAction<string>>;
	currentSearch: string;
	checkStringForSearch: (string:string)=>ReactFragment
}

const ItemCard: FC<Props> = ({
	propData,
	currentView,
	setCurrentView,
	currentSearch,
	children,
	checkStringForSearch
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
							{checkStringForSearch(propData.Title)}
						</h5>
						{children}
						<p className='card-text'>
							{checkStringForSearch(propData.Description)}
						</p>
					</div>
					{checkStringForSearch(propData.title)}
				</div>
			)}
		</div>
	);
};

export default ItemCard;
