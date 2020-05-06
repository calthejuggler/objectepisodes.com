import React, { FC, Dispatch, SetStateAction } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
	currentView: string;
	setCurrentView: Dispatch<SetStateAction<string>>;
}

const BackButton: FC<Props> = ({ currentView, setCurrentView, history }) => {
	return (
		<button
			className='btn btn-secondary mt-3'
			onClick={() =>
				currentView === 'database'
					? history.push('/')
					: setCurrentView('database')
			}
		>
			Back
		</button>
	);
};

export default withRouter(BackButton);
