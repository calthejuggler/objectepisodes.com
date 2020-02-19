import React from 'react';
import AuthUserContext from './context';

export const withAuth = Component => props => (
	<AuthUserContext.Consumer>
		{user => <Component {...props} user={user} />}
	</AuthUserContext.Consumer>
);
