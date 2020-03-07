import React, { useEffect, useState, FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes.js';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AuthUserContext } from './components/Session/index.js';
import LandingPage from './components/Pages/LandingPage/index';
import SideNavBar from './components/SideNavBar';
import Firebase from './components/Firebase/config';
import { withFirebase } from './components/Firebase/context';

const App: FC<{ firebase: Firebase }> = props => {
	const { firebase } = props;
	const [user, setUser] = useState<any>(null);
	useEffect(() => {
		return firebase.auth.onAuthStateChanged((authedUser: any) => {
			authedUser ? setUser(authedUser) : setUser(null);
		});
	}, [firebase]);
	return (
		<AuthUserContext.Provider value={user}>
			<div className='App h-100 w-100'>
				{user ? (
					<>
						<Header user={user} firebase={firebase} />
						<div id='main'>
							<div className='container-fluid'>
								<div className='row'>
									<div className='col-2 d-none d-lg-block px-2'>
										<SideNavBar />
									</div>
									<div className='col-12 col-lg-10'>
										<Switch>
											{routes.map(route => {
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
						<LandingPage />
					</div>
				)}
			</div>
		</AuthUserContext.Provider>
	);
};

export default withFirebase(App);
