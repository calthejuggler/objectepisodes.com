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
		this.dbFunc = app.firestore
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
						forumPosts: 0,
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
	getForumRepliesFromTopic = async currentTopic => {
		return await this.db
			.collection('forum-replies')
			.where('topicID', '==', currentTopic)
			.orderBy('timestamp')
			.get();
	};
	getForumPostFromTopic = async (currentCategory, currentTopic) => {
		return await this.db
			.collection('forum')
			.doc(currentCategory)
			.collection('topics')
			.doc(currentTopic.trim())
			.get();
	};
	getForumTopicsFromCategory = async currentCategory => {
		return await this.db
			.collection('forum')
			.doc(currentCategory)
			.collection('topics')
			.get();
	};
	getUserDataFromUID = async userID => {
		return await this.db
			.collection('users')
			.doc(userID)
			.get();
	};
	getUserDataFromUsername = async username => {
		return await this.db
			.collection('users')
			.where('username', '==', username)
			.get();
	};
	incrementForumPosts = uid => {
		this.db
			.collection('users')
			.doc(uid)
			.update({
				forumPosts: this.dbFunc.FieldValue.increment(1),
			});
	};
}

export default Firebase;
