import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { createAllRouteArray } from '../../../../routes';
import { useState } from 'react';
import { useEffect } from 'react';

interface Props extends RouteComponentProps {
	title: string;
	btnTitle: string;
	url: string;
}

const DashPanel: FC<Props> = props => {
	const { title, children, btnTitle, url, history } = props;
	const [disabled, setDisabled] = useState(true);
	const [routes, setRoutes] = useState(createAllRouteArray());

	useEffect(() => {
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].path === '/' + url) setDisabled(false);
		}
	}, [url]);
	return (
		<div className='card h-100'>
			<div className='card-body text-center'>
				<h4 className='card-title text-center'>{title}</h4>
				{children}
				{btnTitle && (
					<button
						className={
							'btn mt-3 d-block mx-auto ' +
							(disabled ? 'btn-disabled' : 'btn-primary')
						}
						disabled={disabled}
						onClick={() => {
							history.push(url);
						}}
					>
						{btnTitle}
					</button>
				)}
			</div>
		</div>
	);
};

export default withRouter(DashPanel);
