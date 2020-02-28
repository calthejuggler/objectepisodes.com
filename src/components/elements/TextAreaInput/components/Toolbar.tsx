import React, { FunctionComponent, ReactNode, FC } from 'react';

interface ToolbarInterface {
	children: Array<JSX.Element>;
}

const Toolbar: FunctionComponent<ToolbarInterface> = props => {
	return (
		<div className='btn-group d-flex justify-content-center'>
			{props.children.map((child, i) => child)}
		</div>
	);
};

export default Toolbar;
