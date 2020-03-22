import React, { FC } from 'react';
import AuthUserContext from './context';

export const withAuth = (Component: FC) => (props: any) => (
	<AuthUserContext.Consumer>
		{user => <Component {...props} user={user} />}
	</AuthUserContext.Consumer>
);
