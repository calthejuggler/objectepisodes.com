import React, { FC, ReactFragment } from 'react';

const ItemCardField: FC<{
	field: string;
	propData: firebase.firestore.DocumentData;
	i: number;
	checkStringForSearch: (string: string) => ReactFragment;
}> = ({ field, propData, i, checkStringForSearch }) => {
	return (
		<div className='row'>
			<div className='col'>
				<b>{field}: </b>{' '}
			</div>
			<div className='col'>
				{typeof Object.values(propData)[i] === 'string' &&
					checkStringForSearch(Object.values(propData)[i])}
				<hr />
			</div>
		</div>
	);
};

export default ItemCardField;
