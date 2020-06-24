import { Reducer } from 'react';

interface S {
	step: number;
	loading: boolean;
	error: string | null;
	success: boolean;
	emailIsVerified: boolean;
	goldenClubData: firebase.firestore.DocumentData | null;
	photo: File | null;
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	confirmPassword: string;
	username: string;
}

interface A {
	type: string;
	payload?: any;
}

export const initialState = {
	step: 0,
	loading: false,
	error: null,
	success: false,
	emailIsVerified: false,
	goldenClubData: null,
	photo: null,
	email: '',
	firstname: '',
	lastname: '',
	password: '',
	confirmPassword: '',
	username: '',
};

const registerReducer: Reducer<S, A> = (state: S, action: A) => {
	switch (action.type) {
		case 'take-steps':
			return { ...state, step: state.step + action.payload, error: null };
		case 'goto-steps':
			return { ...state, step: action.payload };
		case 'set-error':
			return { ...state, error: action.payload, loading: false };
		case 'set-email-verified':
			return { ...state, emailIsVerified: action.payload };
		case 'set-golden-club':
			return { ...state, goldenClubData: action.payload };
		case 'set-loading':
			return { ...state, loading: action.payload };
		case 'change-field':
			return { ...state, [action.payload.field]: action.payload.value };
		case 'complete-register':
			return {
				...state,
				loading: false,
				step: 5,
				error: null,
				success: true,
			};
		default:
			return state;
	}
};

export default registerReducer;
