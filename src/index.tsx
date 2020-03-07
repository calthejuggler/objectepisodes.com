import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import App from './App';
import { HashRouter } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';

import 'bootstrap';

const fakeProp = 'YO';

ReactDOM.render<any>(
	<HashRouter>
		<FirebaseContext.Provider value={new Firebase(fakeProp)}>
			<FirebaseContext.Consumer>
				{(firebase: Firebase | null) => <App firebase={firebase} />}
			</FirebaseContext.Consumer>
		</FirebaseContext.Provider>
	</HashRouter>,
	document.getElementById('root')
);
