import { Component } from 'react';
import app from 'firebase/app';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyAOAI6o15PF2I53beQ6izEzN-l6wR34ypM',
	authDomain: 'objectepisodes.firebaseapp.com',
	databaseURL: 'https://objectepisodes.firebaseio.com',
	projectId: 'objectepisodes',
	storageBucket: 'objectepisodes.appspot.com',
	messagingSenderId: '818116314626',
	appId: '1:818116314626:web:a170d35ee7732ea6',
};

class Firebase extends Component {
	constructor(props) {
		super(props);
		app.initializeApp(config);
		this.auth = app.auth();
	}
	doRegisterWithEmailAndPassword = async (email, password) => {
		await this.auth.createUserWithEmailAndPassword(email, password);
	};
}

export default Firebase;
