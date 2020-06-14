import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';

import 'bootstrap/dist/js/bootstrap'

const fakeProp = 'YO';

ReactDOM.render<any>(
	<HashRouter>
		<FirebaseContext.Provider value={new Firebase(fakeProp)}>
			<App />
		</FirebaseContext.Provider>
	</HashRouter>,
	document.getElementById('root')
);
