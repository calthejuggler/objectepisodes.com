import React from 'react';

const DashPanel = props => {
    const { title,children } = props;
	return (
		<div className='card h-100'>
			<div className='card-body text-center'>
				<h4 className='card-title text-center'>{title}</h4>
				{children}
			</div>
		</div>
	);
};

export default DashPanel;
