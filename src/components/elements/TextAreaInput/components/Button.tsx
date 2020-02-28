import React, { MouseEventHandler, FunctionComponent } from 'react';

interface ButtonInterface {
	active: boolean;
	onMouseDown: MouseEventHandler;
}

const Button: FunctionComponent<ButtonInterface> = ({
	active,
	onMouseDown,
	children
}) => {
	return (
		<>
			<div />
			<button
				className={
					active
						? 'btn btn-sm btn-primary'
						: 'btn btn-sm btn-secondary'
				}
				onClick={e => e.preventDefault()}
				onMouseDown={onMouseDown}
			>
				{children}
			</button>
		</>
	);
};

export default Button;
