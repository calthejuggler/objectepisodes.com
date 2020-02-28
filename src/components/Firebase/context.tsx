import React, { createContext } from 'react';
import Firebase from './';

const FirebaseContext = createContext<Firebase | null>(null);

export const withFirebase = (Component: React.FunctionComponent<any>) => (
	props: any
) => (
	<FirebaseContext.Consumer>
		{firebase => <Component {...props} firebase={firebase} />}
	</FirebaseContext.Consumer>
);

export default FirebaseContext;
