import React from 'react';
import { Header } from './components/Header/Header';
import { Login } from './components/Pages/Login/Login';
import { Footer } from './components/Footer/Footer';

function App() {
	return (
		<div className='App'>
			<Header />
			<div id='main'>
				<Login />
			</div>
			<Footer />
		</div>
	);
}

export default App;
