import React from 'react';

const Spinner = () => {
	return (
		<div className='col-3 m-auto text-center'>
			<div className='spinner-border' role='status'>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;
