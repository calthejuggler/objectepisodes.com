import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const onPostAdd = functions.firestore
	.document('forum')
	.onCreate((snapshot) => {
		const newDocData = snapshot.data();
		return admin
			.firestore()
			.collection('users')
			.doc(newDocData.user)
			.update({ forumPosts: admin.firestore.FieldValue.increment(1) });
	});

export const onPostDelete = functions.firestore
	.document('forum')
	.onDelete((snapshot) => {
		const oldDocData = snapshot.data();
		return admin
			.firestore()
			.collection('users')
			.doc(oldDocData.user)
			.update({ forumPosts: admin.firestore.FieldValue.increment(-1) });
	});

export const onCommentAdd = functions.firestore
	.document('forum-replies')
	.onCreate((snapshot) => {
        const newDocData = snapshot.data();
		return admin
			.firestore()
			.collection('users')
			.doc(newDocData.user)
            .update({ forumPosts: admin.firestore.FieldValue.increment(1) });
	});

export const onCommentDelete = functions.firestore
	.document('forum-replies')
	.onDelete((snapshot) => {
		const oldDocData = snapshot.data();
		return admin
			.firestore()
			.collection('users')
			.doc(oldDocData.user)
			.update({ forumPosts: admin.firestore.FieldValue.increment(-1) });
	});
