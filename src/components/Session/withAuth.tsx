import React, { FC, PropsWithChildren } from 'react';
import AuthUserContext from './context';

export const withAuth = (Component: FC<PropsWithChildren<any>>) => (props: PropsWithChildren<any>) => (
	<AuthUserContext.Consumer>
		{user => <Component {...props} user={user} />}
	</AuthUserContext.Consumer>
);
