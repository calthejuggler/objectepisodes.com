import React, { createContext } from 'react';

const FirebaseContext = createContext<any>(null);

export const withFirebase = (Component: React.FunctionComponent<any>) => (
	props: any
) => (
	<FirebaseContext.Consumer>
		{firebase => <Component {...props} firebase={firebase} />}
	</FirebaseContext.Consumer>
);

export default FirebaseContext;
