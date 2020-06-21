import React, { useEffect, useState, FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createAllRouteArray } from './routes';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AuthUserContext } from './components/Session';
import LandingPage from './components/Pages/LandingPage/index';
import Firebase from './components/Firebase/config';
import { withFirebase } from './components/Firebase/context';
import Unsubscribe from './components/Pages/Unsubscribe/Unsubscribe';

import { Login } from './components/Pages/Login/Login';

import './custom.scss';

const App: FC<{ firebase: Firebase }> = (props) => {
	const { firebase } = props;
	const [user, setUser] = useState<null | {
		auth: firebase.User;
		data?: firebase.firestore.DocumentData;
	}>(null);
	const routes = createAllRouteArray();
	useEffect(() => {
		return firebase.auth.onAuthStateChanged((authedUser: firebase.User) => {
			if (authedUser) {
				return firebase.db
					.collection('users')
					.doc(authedUser.uid)
					.onSnapshot((res: firebase.firestore.DocumentSnapshot) => {
						res.exists &&
							setUser({ auth: authedUser, data: res.data() });
					});
			}
		});
	}, [firebase]);
	return (
		<AuthUserContext.Provider value={user}>
			<div className='App h-100 w-100'>
				{user ? (
					<>
						<Header user={user} firebase={firebase} />
						<div id='main'>
							<div className='container h-100'>
								<div className='row h-100'>
									<div className='col-12 h-100'>
										<Switch>
											{routes.map((route) => {
												if (
													route.name === 'Dashboard'
												) {
													return (
														<Route
															exact
															key={route.name}
															path={route.path}
															component={
																route.component
															}
														/>
													);
												} else {
													return (
														<Route
															exact
															key={route.name}
															path={route.path}
															component={
																route.component
															}
														/>
													);
												}
											})}
										</Switch>
									</div>
								</div>
							</div>
						</div>
						<Footer />
					</>
				) : (
					<div className='container h-100 w-100'>
						<Switch>
							<Route exact path='/' component={LandingPage} />
							<Route
								exact
								path='/unsubscribe'
								component={Unsubscribe}
							/>
							<Route
								exact
								path='/unsubscribe/:docID'
								component={Unsubscribe}
							/>
							<Route exact path='/login/' component={Login} />
						</Switch>
					</div>
				)}
			</div>
		</AuthUserContext.Provider>
	);
};

export default withFirebase(App);
