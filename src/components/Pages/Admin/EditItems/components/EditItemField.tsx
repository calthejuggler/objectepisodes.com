import React, { FC } from 'react';

interface Props {
	itemData: string[];
}

const EditItemField: FC<Props> = ({ itemData }) => {
	return (
		<div className='row'>
			<div className='col'>
				<p>
					<b>{itemData[0]}: </b>
				</p>
			</div>
			<div className='col'>
				<p>{itemData[1]}</p>
			</div>
		</div>
	);
};

export default EditItemField;
