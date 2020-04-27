import React, { FC } from 'react';

const PropCardField: FC<{
	field: string;
	propData: firebase.firestore.DocumentData;
	i: number;
}> = ({ field, propData, i }) => {
	return (
		<div className='row' key={'dataField' + i}>
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

export default PropCardField;
