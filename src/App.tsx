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
import RegisterPage from './components/Pages/GoldenClubs/RegisterPage';

const App: FC<{ firebase: Firebase }> = (props) => {
	const { firebase } = props;
	const [user, setUser] = useState<null | {
		auth: firebase.User;
		data?: firebase.firestore.DocumentData;
	}>(null);
	const routes = createAllRouteArray();
	useEffect(() => {
		return firebase.auth.onAuthStateChanged((authedUser: firebase.User) => {
			if (authedUser)
				firebase.db
					.collection('users')
					.doc(authedUser.uid)
					.get()
					.then((res: firebase.firestore.DocumentSnapshot) => {
						res.exists &&
							setUser({ auth: authedUser, data: res.data() });
					})
					.catch((e: Error) => console.dir(e));
			else setUser(null);
		});
	}, [firebase]);
	return (
		<AuthUserContext.Provider value={user}>
			<div className='App h-100 w-100'>
				{user ? (
					<>
						<Header user={user} />
						<div id='main'>
							<div className='container h-100'>
								<Switch>
									{routes.map((route) => {
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
													exact
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
							<Route
								exact
								path='/goldenClubs/:clubID'
								component={RegisterPage}
							/>
						</Switch>
					</div>
				)}
			</div>
		</AuthUserContext.Provider>
	);
};

export default withFirebase(App);
