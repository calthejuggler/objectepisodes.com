import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';

import 'bootstrap/dist/js/bootstrap';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const fakeProp = 'YO';
const reCaptchaKey = '6Le5G60ZAAAAAIQGRgQP6ihod21_rrLLr5t0ez6V';

ReactDOM.render<any>(
	<GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
		<HashRouter>
			<FirebaseContext.Provider value={new Firebase(fakeProp)}>
				<App />
			</FirebaseContext.Provider>
		</HashRouter>
	</GoogleReCaptchaProvider>,
	document.getElementById('root')
);
