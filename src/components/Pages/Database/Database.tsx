import React, { useState } from 'react';
import { createDatabaseRouteArray } from '../../../routes';
import DatabaseThumb from './../../elements/DatabaseThumb';

const Database = () => {
	const [routes, setRoutes] = useState(createDatabaseRouteArray());
	return (
		<div className='row align-items-center justify-content-around h-100'>
			{routes.map(route => (
				<DatabaseThumb key={route.name} route={route} />
			))}
		</div>
	);
};

export default Database;
