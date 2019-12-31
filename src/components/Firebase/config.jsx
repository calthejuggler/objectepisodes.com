import { Component } from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
		this.db = app.firestore();
	}

	// Auth functions
	doRegisterWithEmailAndPassword = async (
		email,
		password,
		firstname,
		lastname,
		username
	) => {
		await this.auth
			.createUserWithEmailAndPassword(email, password)
			.then(res => {
				res.user.updateProfile({ displayName: username });
				this.db
					.collection('users')
					.doc(res.user.uid)
					.set({
						firstname: firstname,
						lastname: lastname,
						username: username,
						email: email,
						admin: false,
						created: new Date(),
					});
			});
	};
	doSignOut = () => {
		this.auth.signOut();
	};
	doLoginWithEmailAndPassword = async (email, password) => {
		await this.auth.signInWithEmailAndPassword(email, password);
	};
	doSendForgotPasswordEmail = async email => {
		await this.auth.sendPasswordResetEmail(email);
	};

	// Firestore functions
	getForumPostFromTopic = async (currentCategory, currentTopic) => {
		let topicSnap = await this.db
			.collection('forum')
			.doc(currentCategory)
			.collection('topics')
			.doc(currentTopic.trim())
			.get();
		return topicSnap;
	};
	getForumTopicsFromCategory = async currentCategory => {
		let categorySnap = await this.db
			.collection('forum')
			.doc(currentCategory)
			.collection('topics')
			.get();
		return categorySnap;
	};
	getUserDataFromUID = async userID => {
		let userSnap = await this.db
			.collection('users')
			.doc(userID)
			.get();
		return userSnap;
	};
}

export default Firebase;
