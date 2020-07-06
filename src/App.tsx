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
import ErrorBoundary from './components/ErrorBoundary';

const App: FC<{ firebase: Firebase }> = (props) => {
	const { firebase } = props;
	const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
	const [userData, setUserData] = useState<
		firebase.firestore.DocumentData | undefined
	>();
	const [userAdmin, setUserAdmin] = useState<
		firebase.firestore.DocumentData | undefined
	>();
	const routes = createAllRouteArray();

	useEffect(() => {
		return firebase.auth.onAuthStateChanged((authedUser: firebase.User) => {
			if (authedUser) setUserAuth(authedUser);
			else setUserAuth(null);
		});
	}, [firebase.auth]);

	useEffect(() => {
		if (userAuth) {
			return firebase.db
				.collection('users')
				.doc(userAuth.uid)
				.onSnapshot(
					(userDataSnap: firebase.firestore.DocumentSnapshot) => {
						if (userDataSnap.exists)
							setUserData(userDataSnap.data());
						else setUserData(undefined);
					},
					(e: Error) => {
						console.error({ e });
					}
				);
		}
	}, [userAuth, firebase.db]);

	useEffect(() => {
		if (userAuth)
			firebase.db
				.collection('users-admin-config')
				.doc(userAuth.uid)
				.get()
				.then((adminSnap: firebase.firestore.DocumentSnapshot) => {
					if (adminSnap.exists) setUserAdmin(adminSnap.data());
					else setUserAdmin(undefined);
				})
				.catch((e: Error) => console.error(e));
	}, [userAuth, firebase.db]);

	return (
		<AuthUserContext.Provider
			value={
				userAuth
					? { auth: userAuth, data: userData, admin: userAdmin }
					: null
			}
		>
			<ErrorBoundary>
				<div className='App h-100 w-100'>
					{userAuth ? (
						<>
							<Header />
							<div id='main'>
								<div className='container h-100'>
									<Switch>
										{routes.map((route) => {
											return (
												<Route
													exact
													key={route.name}
													path={route.path}
													component={route.component}
												/>
											);
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
			</ErrorBoundary>
		</AuthUserContext.Provider>
	);
};

export default withFirebase(App);
