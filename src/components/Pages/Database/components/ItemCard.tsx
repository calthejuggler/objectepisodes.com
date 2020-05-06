import React, { FC, Dispatch, SetStateAction } from 'react';
import ItemCardField from './ItemCardField';

interface Props {
	propData: firebase.firestore.DocumentData;
	i: number;
	currentView: string;
	setCurrentView: Dispatch<SetStateAction<string>>;
}

const ItemCard: FC<Props> = ({ propData, i, currentView, setCurrentView }) => {
	return (
		<div className='col-12 my-3 col-sm-6 col-md-4 col-lg-3'>
			{currentView === 'database' ? (
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
							{propData.Title}
						</h5>
						{Object.keys(propData).map(
							(field, i) =>
								field !== 'Title' &&
								field !== 'Description' &&
								isNaN(Number.parseInt(field[0])) &&
								field[0] === field[0].toUpperCase() && (
									<ItemCardField
										key={'dataField' + i}
										field={field}
										propData={propData}
										i={i}
									/>
								)
						)}
						<p className='card-text'>{propData.Description}</p>
					</div>
					{propData.title}
				</div>
			)}
		</div>
	);
};

export default ItemCard;
