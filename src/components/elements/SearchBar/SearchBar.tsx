import React, { FC, Dispatch, SetStateAction } from 'react';
import { withFirebase } from '../../Firebase/context';

interface Props {
	currentSearch: string;
	setCurrentSearch: Dispatch<SetStateAction<string>>;
}

const SearchBar: FC<Props> = ({
	currentSearch,
	setCurrentSearch,
}) => {
	return (
		<input
			className='form-control'
			value={currentSearch}
			onChange={(e) => setCurrentSearch(e.target.value.toLowerCase())}
			placeholder='Search...'
		/>
	);
};

export default withFirebase(SearchBar);
