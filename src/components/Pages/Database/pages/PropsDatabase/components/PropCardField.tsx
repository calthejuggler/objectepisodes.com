import React, { FC } from 'react';

const PropCardField: FC<{
	field: string;
	propData: firebase.firestore.DocumentData;
	i: number;
}> = ({ field, propData, i }) => {
	return (
		<div className='row' key={'dataField' + i}>
			{field}:{' '}
			{typeof Object.values(propData)[i] === 'string' &&
				Object.values(propData)[i]}
		</div>
	);
};

export default PropCardField;
