import { createContext } from 'react';

import firebase from 'firebase';

export type UserContextInterface = firebase.User | null;

const AuthUserContext = createContext<firebase.User | null>(null);
export default AuthUserContext;
