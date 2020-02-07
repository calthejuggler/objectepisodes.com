import { Component } from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_FIREBASE_APPID,
};

class Firebase extends Component {
	constructor(props) {
		super(props);
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.firestore();
		this.dbFunc = app.firestore;
		this.storage = app.storage();
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
			.doc(currentTopic.trim())
			.get();
	};
	getForumTopicsFromCategory = async currentCategory => {
		return await this.db
			.collection('forum')
			.where('category', '==', currentCategory)
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
