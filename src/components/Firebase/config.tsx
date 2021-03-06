import { Component } from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { UserContextInterface } from '../Session/context';

// import './admin.ts';

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
	doRegisterWithEmailPasswordAndPhoto = async (
		email: string,
		password: string,
		firstname: string,
		lastname: string,
		username: string,
		photo: File
	) => {
		let tempPhotoURL = '';
		let tempUID = '';
		await this.storage
			.ref()
			.child('profile-pictures/' + username)
			.put(photo)
			.then((uploadSnap: firebase.storage.UploadTaskSnapshot) => {
				return uploadSnap.ref.getDownloadURL();
			})
			.then((url: string) => {
				tempPhotoURL = url;
				return this.auth.createUserWithEmailAndPassword(
					email,
					password
				);
			})
			.then((userCred: firebase.auth.UserCredential) => {
				userCred.user?.uid && (tempUID = userCred.user.uid);
				return userCred.user?.updateProfile({
					displayName: firstname + ' ' + lastname,
					photoURL: tempPhotoURL,
				});
			})
			.then(() => {
				return this.db.collection('users').doc(tempUID).set({
					firstname: firstname,
					lastname: lastname,
					username: username,
					email: email,
					admin: false,
					forumPosts: 0,
					created: this.dbFunc.FieldValue.serverTimestamp(),
					photoURL: tempPhotoURL,
				});
			})
			.then(() => {
				return this.db
					.collection('golden-clubs')
					.where('sentTo', '==', email)
					.get();
			})
			.then((snap: firebase.firestore.QuerySnapshot) => {
				snap.docs.forEach(
					(doc: firebase.firestore.QueryDocumentSnapshot) => {
						console.dir('deleting');
						doc.ref.delete();
					}
				);
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
	doCreateGoldenClubAndGiveToUser = async (userID: string) => {
		await this.db
			.collection('golden-clubs')
			.add({
				created: this.dbFunc.FieldValue.serverTimestamp(),
				owner: userID,
				sentTo: null,
			})
			.then((doc: firebase.firestore.DocumentReference) => {
				this.db
					.collection('users')
					.doc(userID)
					.update({
						goldenClubs: this.dbFunc.FieldValue.arrayUnion(doc.id),
						goldenClubCount: this.dbFunc.FieldValue.increment(1),
					});
			});
	};

	doDeleteGoldenClub = async (clubID: string) => {
		await this.db.collection('golden-clubs').doc(clubID).delete();
	};

	// Update personal info
	doChangeProfilePicture = async (
		photo: File,
		user: UserContextInterface
	) => {
		if (!user) return;
		const firebaseQuery = this.storage.ref(
			'profile-pictures/' + user.auth?.uid
		);
		let url: null | string = null;
		firebaseQuery
			.put(photo)
			.then((snap: firebase.storage.UploadTaskSnapshot) => {
				return snap.ref.getDownloadURL();
			})
			.then((getURL: string) => {
				url = getURL;
				user.auth?.updateProfile({ photoURL: url });
			})
			.then(() => {
				this.db
					.collection('users')
					.doc(user.auth?.uid)
					.update({ photoURL: url });
			});
	};

	// Firestore functions
	getForumRepliesFromTopic = async (currentTopic: string) => {
		return await this.db
			.collection('forum-replies')
			.where('topicID', '==', currentTopic)
			.orderBy('timestamp')
			.get();
	};
	getForumPostFromTopic = async (currentTopic: null | string) => {
		if (currentTopic) {
			return await this.db
				.collection('forum')
				.doc(currentTopic.trim())
				.get();
		}
	};
	getForumTopicsFromCategory: (
		currentCategory: string
	) => Promise<app.firestore.DocumentSnapshot> = async (currentCategory) => {
		return await this.db
			.collection('forum')
			.where('category', '==', currentCategory)
			.get();
	};
	getUserDataFromUID = async (userID: string) => {
		return await this.db.collection('users').doc(userID).get();
	};
	getUserDataFromUsername = async (username: string) => {
		return await this.db
			.collection('users')
			.where('username', '==', username)
			.get();
	};
	incrementForumPosts = async (uid: string) => {
		await this.db
			.collection('users')
			.doc(uid)
			.update({
				forumPosts: this.dbFunc.FieldValue.increment(1),
			});
	};
}

export default Firebase;
