import React from 'react';

const Toolbar = ({ children }) => {
	return (
		<div className='btn-group d-flex justify-content-center'>
			{children.map((child, i) => child)}
		</div>
	);
};

export default Toolbar;
