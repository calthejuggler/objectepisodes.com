import React from 'react';

const Icon = ({ children, iconSize }) => {
	if (iconSize === 'small')
		return <i style={{ fontSize: '0.75rem' }} className={children}></i>;
	return <i className={children}></i>;
};

export default Icon;
