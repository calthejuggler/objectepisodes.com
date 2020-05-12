import React, { FC, Dispatch, SetStateAction } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
	currentView: string;
	setCurrentView: Dispatch<SetStateAction<string>>;
	setCurrentSearch: Dispatch<SetStateAction<string>>;
}

const BackButton: FC<Props> = ({
	currentView,
	setCurrentView,
	history,
	setCurrentSearch,
}) => {
	return (
		<button
			className='btn btn-secondary mt-3'
			onClick={() => {
				if (currentView === 'database') {
					history.push('/');
				} else {
					setCurrentView('database');
					setCurrentSearch('');
				}
			}}
		>
			Back
		</button>
	);
};

export default withRouter(BackButton);
