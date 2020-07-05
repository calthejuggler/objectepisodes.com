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
import { UserContextInterface } from './components/Session/context';

const App: FC<{ firebase: Firebase }> = (props) => {
	const { firebase } = props;
	const [user, setUser] = useState<UserContextInterface>({
		auth: null,
		data: null,
	});
	const routes = createAllRouteArray();
	useEffect(() => {
		return firebase.db
			.collection('users')
			.doc(user?.auth?.uid)
			.onSnapshot((userDataSnap: firebase.firestore.DocumentSnapshot) => {
				if (userDataSnap && userDataSnap.exists)
					setUser(
						(prev): UserContextInterface => {
							return { ...prev, data: userDataSnap.data() };
						}
					);
			});
	}, [firebase, user]);
	useEffect(() => {
		return firebase.db
			.collection('users-admin-config')
			.doc(user?.auth?.uid)
			.onSnapshot(
				(userAdminDataSnap: firebase.firestore.DocumentSnapshot) => {
					if (userAdminDataSnap && userAdminDataSnap.exists)
						setUser(
							(prev): UserContextInterface => {
								return {
									...prev,
									admin: userAdminDataSnap.data(),
								};
							}
						);
				}
			);
	}, [firebase, user]);
	useEffect(() => {
		return firebase.auth.onAuthStateChanged((authedUser: firebase.User) => {
			if (authedUser)
				setUser(
					(prev): UserContextInterface => {
						return { ...prev, auth: authedUser };
					}
				);
			else setUser({ auth: null, data: null });
		});
	}, [firebase]);
	return (
		<AuthUserContext.Provider value={user}>
			<ErrorBoundary>
				<div className='App h-100 w-100'>
					{user ? (
						<>
							<Header user={user} />
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
