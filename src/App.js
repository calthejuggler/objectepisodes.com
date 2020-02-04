import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes.js';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { FirebaseContext } from './components/Firebase/index.jsx';
import { AuthUserContext } from './components/Session/index.js';
import LandingPage from './components/Pages/LandingPage/index.jsx';

function App(props) {
	const { firebase } = props;
	const [user, setUser] = useState(null);
	useEffect(() => {
		return firebase.auth.onAuthStateChanged(authedUser => {
			authedUser ? setUser(authedUser) : setUser(null);
		});
	}, [firebase]);
	return (
		<AuthUserContext.Provider value={user}>
			<div className='App h-100 w-100'>
				{user ? (
					<>
						<FirebaseContext.Consumer>
							{firebase => (
								<Header user={user} firebase={firebase} />
							)}
						</FirebaseContext.Consumer>
						<div id='main'>
							<div className='container-fluid'>
								<Switch>
									{routes.map(route => {
										if (route.name === 'Dashboard') {
											return (
												<Route
													exact
													key={route.name}
													path={route.path}
													component={route.component}
												/>
											);
										} else {
											return (
												<Route
													key={route.name}
													path={route.path}
													component={route.component}
												/>
											);
										}
									})}
								</Switch>
							</div>
						</div>
						<Footer />
					</>
				) : (
					<div className='container h-100 w-100'>
						<LandingPage />
					</div>
				)}
			</div>
		</AuthUserContext.Provider>
	);
}

export default App;
