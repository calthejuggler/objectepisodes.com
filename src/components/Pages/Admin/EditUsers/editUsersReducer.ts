import { Reducer } from 'react';

interface State {
	loading: boolean;
	users: { id: string; data: firebase.firestore.DocumentData }[];
	numberOfRows: number;
	thereAreMore: boolean;
	selectedUser: { id: string; data: firebase.firestore.DocumentData } | null;
}
interface Action {
	type: string;
	payload?: any;
}

export const editUsersReducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'load-user':
			return { ...state, users: [...state.users, action.payload] };
		case 'finish-load':
			return { ...state, loading: false };
		case 'select-user':
			return { ...state, selectedUser: action.payload };
		default:
			return state;
	}
};