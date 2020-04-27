import React, { FC } from 'react';
import PropCardField from './PropCardField';

interface Props {
	propData: firebase.firestore.DocumentData;
	i: number;
}

const PropCard: FC<Props> = ({ propData, i }) => {
	return (
		<div className='col-6 col-md-4 col-lg-3' key={'dataCard' + i}>
			<div className='card'>
				{propData.photoURL && (
					<img
						src={propData.photoURL}
						alt={propData.Title}
						className='card-img-top'
					/>
				)}
				<div className='card-body'>
					<h5 className='card-title'>{propData.Title}</h5>
					{Object.keys(propData).map(
						(field, i) =>
							field !== 'Title' &&
							field !== 'Description' &&
							isNaN(Number.parseInt(field[0])) &&
							field[0] === field[0].toUpperCase() && (
								<PropCardField
									field={field}
									propData={propData}
									i={i}
								/>
							)
					)}
					<p className='card-text'>{propData.Description}</p>
				</div>
			</div>
			{propData.title}
		</div>
	);
};

export default PropCard;
