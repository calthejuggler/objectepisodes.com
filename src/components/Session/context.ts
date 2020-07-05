import { createContext } from 'react';

import firebase from 'firebase';

export type UserContextInterface = {
	auth: firebase.User | null;
	data?: firebase.firestore.DocumentData | null;
	admin?: firebase.firestore.DocumentData | null;
};

const AuthUserContext = createContext<UserContextInterface>({
	auth: null,
	data: null,
});
export default AuthUserContext;
