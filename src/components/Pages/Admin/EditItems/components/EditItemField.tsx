import React, { FC } from 'react';

interface Props {
	itemData: string[];
}

const EditItemField: FC<Props> = ({ itemData }) => {
	return (
		<div className='row'>
			<div className='col'>
				<p>
					<em>{itemData[0]}:</em>
				</p>
			</div>
			<div className='col'>
				<p>{itemData[1]}</p>
			</div>
		</div>
	);
};

export default EditItemField;
