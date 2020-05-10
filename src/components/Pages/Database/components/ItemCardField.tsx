import React, { FC,  } from 'react';
import { checkStringForSearchAndBuild } from './../../../../functions/_checkStringForSearchAndBuild';

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
					checkStringForSearchAndBuild(
						Object.values(propData)[i],
						currentSearch
					)}
				<hr />
			</div>
		</div>
	);
};

export default ItemCardField;
