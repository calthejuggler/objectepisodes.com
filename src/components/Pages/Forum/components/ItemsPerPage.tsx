import React, { Dispatch, SetStateAction, FC } from 'react';

interface Props {
	setLoadingState: Dispatch<SetStateAction<boolean>>;
	setItemsPerPage: Dispatch<SetStateAction<number>>;
	currentItemsPerPage: number;
}

const ItemsPerPage: FC<Props> = props => {
	const { setLoadingState, setItemsPerPage, currentItemsPerPage } = props;
	return (
		<div className='form-group'>
			<label htmlFor='topicsPerPage'>Items/Page: </label>
			<select
				name='topicsPerPage'
				id='topicsPerPage'
				className='dropdown'
				value={currentItemsPerPage}
				onChange={e => {
					setLoadingState(true);
					setItemsPerPage(parseInt(e.target.value, 10));
				}}
			>
				<option value={5}>5</option>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={40}>40</option>
				<option value={80}>80</option>
				<option value={100}>100</option>
			</select>
		</div>
	);
};

export default ItemsPerPage;
