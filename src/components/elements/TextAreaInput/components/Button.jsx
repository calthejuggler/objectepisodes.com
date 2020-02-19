import React from 'react';

interface ButtonInterface {
	active: boolean,
	onMouseDown: Function,
	
}

const Button = ({ active, children, onMouseDown }) => {
	return (
		<button
			className={
				active ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary'
			}
			onClick={e => e.preventDefault()}
			onMouseDown={onMouseDown}>
			{children}
		</button>
	);
};

export default Button;
