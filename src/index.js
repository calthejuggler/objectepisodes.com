import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import App from './App';
import { HashRouter } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';

import '../node_modules/bootstrap/dist/js/bootstrap.js';

ReactDOM.render(
	<HashRouter>
		<FirebaseContext.Provider value={new Firebase()}>
			<FirebaseContext.Consumer>
				{firebase => <App firebase={firebase} />}
			</FirebaseContext.Consumer>
		</FirebaseContext.Provider>
	</HashRouter>,
	document.getElementById('root')
);
