import React, { FC } from 'react';

const Spinner: FC = ({ children }) => {
	return (
		<>
			<div className='col-3 m-auto text-center'>
				<div className='spinner-border' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
			{children}
		</>
	);
};

export default Spinner;
