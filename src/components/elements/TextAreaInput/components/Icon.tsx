import React, { FunctionComponent } from 'react';

interface IconPropsInterface {
	iconSize?: string;
	children: string;
}

const Icon: FunctionComponent<IconPropsInterface> = ({
	iconSize,
	children
}) => {
	if (iconSize === 'small')
		return <i style={{ fontSize: '0.75rem' }} className={children}></i>;
	return <i className={children}></i>;
};

export default Icon;
