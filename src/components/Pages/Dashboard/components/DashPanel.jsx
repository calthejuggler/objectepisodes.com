import React from 'react';
import { withRouter } from 'react-router-dom';

import routes from '../../../../routes';
import { useState } from 'react';
import { useEffect } from 'react';

const DashPanel = props => {
	const { title, children, btnTitle, url, history } = props;
	const [disabled, setDisabled] = useState(true);
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
						className='btn btn-primary mt-3 d-block mx-auto'
						disabled={disabled}
						onClick={() => {
							history.push(url);
						}}>
						{btnTitle}
					</button>
				)}
			</div>
		</div>
	);
};

export default withRouter(DashPanel);
