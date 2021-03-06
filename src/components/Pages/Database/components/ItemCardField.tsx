import React, { FC } from 'react';

const ItemCardField: FC<{
	field: string;
	propData: firebase.firestore.DocumentData;
	i: number;
	currentSearch: string;
}> = ({ field, propData, i, currentSearch }) => {
	return (
		<div className='row'>
			<div className='col'>
				<b>{field}: </b>{' '}
			</div>
			<div className='col'>
				{typeof Object.values(propData)[i] === 'string' &&
					Object.values(propData)[i]}
				<hr />
			</div>
		</div>
	);
};

export default ItemCardField;
