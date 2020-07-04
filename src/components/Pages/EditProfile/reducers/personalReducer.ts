import { Reducer } from 'react';

interface State {
	firstname: string;
	lastname: string;
	email: string;
	error: string | null;
	uploadedImg: File | null;
	imgURL: string | null;
	loading: boolean;
	changed: boolean;
	success: boolean;
}
interface Action {
	type: string;
	payload?: any;
}

export const personalReducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'set-loading':
			return { ...state, loading: action.payload };
		case 'set-error':
			return {
				...state,
				error: action.payload,
				loading: false,
				success: false,
			};
		case 'success':
			return {
				...state,
				error: null,
				loading: false,
				changed: false,
				success: true,
			};
		case 'change-field':
			return { ...state, ...action.payload };
		case 'input-image':
			return {
				...state,
				uploadedImg: action.payload,
				error: null,
				changed: true,
				success: false,
			};
		default:
			return state;
	}
};
