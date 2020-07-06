import { createContext } from 'react';

import firebase from 'firebase';

export type UserContextInterface = {
	auth: firebase.User;
	data?: null | firebase.firestore.DocumentData;
	admin?: null | firebase.firestore.DocumentData;
} | null;

const AuthUserContext = createContext<UserContextInterface>(null);
export default AuthUserContext;
