import React, { useState } from 'react';
import { createDatabaseRouteArray } from '../../../routes';
import CategoryViewer from './components/CategoryViewer';

const Database = () => {
	const routes: Array<{
		name: string;
		path: string;
	}> = createDatabaseRouteArray();
	const [currentView, setCurrentView] = useState<string>('database');
	return (
		<CategoryViewer currentView={currentView} setCurrentView={setCurrentView} />
	)
	// switch (currentView) {
	// 	case 'database':
	// 		return (
	// 			<div className='row align-items-center justify-content-around h-100'>
	// 				{routes.map((route) => (
	// 					<DatabaseThumb
	// 						key={route.name}
	// 						route={route}
	// 						setCurrentView={setCurrentView}
	// 					/>
	// 				))}
	// 			</div>
	// 		);
	// 	case 'props':
	// 		return <PropsDatabase />;
	// 	default:
	// 		return (
	// 			<div className='row align-items-center justify-content-around h-100'>
	// 				{routes.map((route) => (
	// 					<DatabaseThumb
	// 						key={route.name}
	// 						route={route}
	// 						setCurrentView={setCurrentView}
	// 					/>
	// 				))}
	// 			</div>
	// 		);
	// }
};

export default Database;
