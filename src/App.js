import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Register } from './components/Pages/Register/Register';

function App() {
	return (
		<div className='App'>
			<Header />
			<div id='main'>
				<div className='container-fluid'>
					<Register />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
