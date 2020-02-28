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
	appId: process.env.REACT_APP_FIREBASE_APPID
};

class Firebase extends Component {
	auth: any;
	db: any;
	dbFunc: any;
	storage: any;

	constructor(props: any) {
		super(props);
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.firestore();
		this.dbFunc = app.firestore;
		this.storage = app.storage();
	}

	// Auth functions
	doRegisterWithEmailAndPassword = async (
		email: string,
		password: string,
		firstname: string,
		lastname: string,
		username: string
	) => {
		await this.auth
			.createUserWithEmailAndPassword(email, password)
			.then((res: app.User) => {
				res.updateProfile({ displayName: username });
				this.db
					.collection('users')
					.doc(res.uid)
					.set({
						firstname: firstname,
						lastname: lastname,
						username: username,
						email: email,
						admin: false,
						forumPosts: 0,
						created: new Date()
					});
			});
	};
	doSignOut = () => {
		this.auth.signOut();
	};
	doLoginWithEmailAndPassword = async (email: string, password: string) => {
		await this.auth.signInWithEmailAndPassword(email, password);
	};
	doSendForgotPasswordEmail = async (email: string) => {
		await this.auth.sendPasswordResetEmail(email);
	};

	// Firestore functions
	getForumRepliesFromTopic = async (currentTopic: string) => {
		return await this.db
			.collection('forum-replies')
			.where('topicID', '==', currentTopic)
			.orderBy('timestamp')
			.get();
	};
	getForumPostFromTopic = async (
		currentTopic: string
	) => {
		return await this.db
			.collection('forum')
			.doc(currentTopic.trim())
			.get();
	};
	getForumTopicsFromCategory = async (currentCategory: string) => {
		return await this.db
			.collection('forum')
			.where('category', '==', currentCategory)
			.get();
	};
	getUserDataFromUID = async (userID: string) => {
		return await this.db
			.collection('users')
			.doc(userID)
			.get();
	};
	getUserDataFromUsername = async (username: string) => {
		return await this.db
			.collection('users')
			.where('username', '==', username)
			.get();
	};
	incrementForumPosts = (uid: string) => {
		this.db
			.collection('users')
			.doc(uid)
			.update({
				forumPosts: this.dbFunc.FieldValue.increment(1)
			});
	};
}

export default Firebase;
