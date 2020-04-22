import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
	route: { name: string; path: string };
}

const DatabaseThumb: FC<Props> = ({ route, history }) => {
	return (
		<div
			className='col-6 col-md-4 col-lg text-center py-3'
			onClick={() => history.push(route.path)}
		>
			<div className='card h-100'>
				<div className='card-body'>{route.name}</div>
			</div>
		</div>
	);
};

export default withRouter(DatabaseThumb);
