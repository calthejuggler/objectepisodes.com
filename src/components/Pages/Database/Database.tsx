import React, { useState } from 'react';
import CategoryViewer from './components/CategoryViewer';

const Database = () => {
	const [currentView, setCurrentView] = useState<string>('database');
	return (
		<>
			
			<CategoryViewer
				currentView={currentView}
				setCurrentView={setCurrentView}
			/>
		</>
	);
};

export default Database;
