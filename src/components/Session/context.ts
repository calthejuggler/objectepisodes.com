import { createContext } from 'react';

import firebase from 'firebase';

export interface UserContextInterface {
	auth: firebase.User;
	data?: firebase.firestore.DocumentData;
}

const AuthUserContext = createContext<UserContextInterface | null>(null);
export default AuthUserContext;
