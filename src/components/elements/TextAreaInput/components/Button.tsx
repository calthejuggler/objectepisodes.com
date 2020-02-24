import React, { MouseEventHandler } from 'react';

interface ButtonInterface {
	active: boolean;
	onMouseDown: MouseEventHandler;
	children: HTMLElement;
}

const Button = (props: ButtonInterface) => {
	return (
		<>
			<div />
			<button
				className={
					props.active
						? 'btn btn-sm btn-primary'
						: 'btn btn-sm btn-secondary'
				}
				onClick={e => e.preventDefault()}
				onMouseDown={props.onMouseDown}>
				{props.children}
			</button>
		</>
	);
};

export default Button;
