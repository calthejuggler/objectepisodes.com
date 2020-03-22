import { createContext } from 'react';

import firebase from 'firebase';

const AuthUserContext = createContext<firebase.auth.UserCredential | null>(
	null
);
export default AuthUserContext;
