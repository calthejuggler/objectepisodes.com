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
				<div className='card-body'>
					{Object.keys(propData).map(
						(field, i) =>
							isNaN(Number.parseInt(field[0])) &&
							field[0] === field[0].toUpperCase() && (
								<PropCardField
									field={field}
									propData={propData}
									i={i}
								/>
							)
					)}
				</div>
			</div>
			{propData.title}
		</div>
	);
};

export default PropCard;
