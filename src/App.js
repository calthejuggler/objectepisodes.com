import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes.js';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App(props) {
	const [user, setUser] = useState(null);
	useEffect(() => {
		props.firebase.auth.onAuthStateChanged(authedUser => {
			authedUser ? setUser(authedUser) : setUser(null);
		});
		return () => {
			setUser(null);
		};
	}, [props.firebase]);
	return (
		<div className='App'>
			<Header />
			<div id='main'>
				<div className='container-fluid'>
					<Switch>
						{routes.map(route => (
							<Route
								key={route.name}
								path={route.path}
								component={route.component}
							/>
						))}
					</Switch>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
