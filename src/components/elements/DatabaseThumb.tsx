import React, { FC, Dispatch, SetStateAction } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
	route: { name: string; path: string };
	setCurrentView: Dispatch<SetStateAction<string>>;
}

const DatabaseThumb: FC<Props> = ({ route, history, setCurrentView }) => {
	return (
		<div
			className='col-6 col-md-4 col-lg text-center py-3'
			onClick={() => {
				setCurrentView(route.name);
			}}
		>
			<div className='card h-100 btn btn-white'>
				<div className='card-body btn-link'>
					{route.name[0].toUpperCase() + route.name.slice(1)}
				</div>
			</div>
		</div>
	);
};

export default withRouter(DatabaseThumb);
