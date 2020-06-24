import React, { useReducer, MouseEvent, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { withFirebase } from '../../../Firebase/context';
import Firebase from './../../../Firebase/config';

import Step0 from './components/Step0';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';

import registerReducer, { initialState } from './registerReducer';

const RegisterPage: FC<{ firebase: Firebase }> = ({ firebase }) => {
	const [state, dispatch] = useReducer(registerReducer, initialState);

	const {
		step,
		error,
		email,
		goldenClubData,
		password,
		confirmPassword,
		firstname,
		lastname,
		username,
		photo,
		success,
	} = state;

	const { clubID } = useParams();

	useEffect(() => {
		if (clubID) {
			firebase.db
				.collection('golden-clubs')
				.doc(clubID)
				.get()
				.then((res: firebase.firestore.DocumentSnapshot) => {
					res.exists
						? dispatch({
								type: 'set-golden-club',
								payload: res.data(),
						  })
						: dispatch({
								type: 'set-error',
								payload: 'This golden club does not exist...',
						  });
				})
				.catch((e: Error) =>
					dispatch({ type: 'set-error', payload: e.message })
				);
		}
	}, [clubID, firebase.db]);

	const handleNextButton = (e: MouseEvent) => {
		e.preventDefault();
		switch (step) {
			case 0:
				const emailReg = RegExp(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
				if (!email.match(emailReg)) {
					dispatch({
						type: 'set-error',
						payload: 'The email address you provided is not valid.',
					});
					return;
				} else if (!goldenClubData?.sentTo) {
					dispatch({
						type: 'set-error',
						payload: 'This golden club has not been sent yet...',
					});
					return;
				} else if (goldenClubData?.sentTo !== email) {
					dispatch({
						type: 'set-error',
						payload:
							'This golden club was sent to a different email address.',
					});
					return;
				} else {
					dispatch({ type: 'set-email-verified', payload: true });
					dispatch({ type: 'take-steps', payload: 1 });
					return;
				}
			case 1:
				if (password.length < 8) {
					dispatch({
						type: 'set-error',
						payload:
							'Your password must be at least 8 characters in length!',
					});
					return;
				} else if (password !== confirmPassword) {
					dispatch({
						type: 'set-error',
						payload:
							'The two passwords that you entered do not match.',
					});
					return;
				} else {
					dispatch({
						type: 'take-steps',
						payload: 1,
					});
					return;
				}
			case 2:
				if (firstname === '' || lastname === '' || username === '') {
					dispatch({
						type: 'set-error',
						payload: 'All fields are required!',
					});
					return;
				} else if (username.match(/[^a-zA-Z0-9]/)) {
					dispatch({
						type: 'set-error',
						payload:
							'Your username cannot contain spaces or special characters',
					});
					return;
				} else {
					firebase.db
						.collection('users')
						.where('username', '==', username)
						.get()
						.then((snap: firebase.firestore.QuerySnapshot) => {
							if (!snap.empty)
								dispatch({
									type: 'set-error',
									payload: 'That username is unavailable.',
								});
							else dispatch({ type: 'take-steps', payload: 1 });
						})
						.catch((e: Error) =>
							dispatch({ type: 'set-error', payload: e.message })
						);
					return;
				}
			case 3:
				dispatch({ type: 'take-steps', payload: 1 });
				return;
			case 4:
				dispatch({ type: 'set-loading', payload: true });
				firebase
					.doRegisterWithEmailPasswordAndPhoto(
						email,
						password,
						firstname,
						lastname,
						username,
						photo
					)
					.then(() => {
						dispatch({ type: 'complete-register' });
					})
					.catch((e: Error) =>
						dispatch({
							type: 'set-error',
							payload: e.message,
						})
					);
				return;
		}
	};

	const handlePreviousButton = (e: MouseEvent) => {
		e.preventDefault();
		dispatch({ type: 'take-steps', payload: -1 });
	};

	return (
		<div className='row h-100'>
			<div className='col-12 m-auto text-center'>
				<h3 className='display-4 pt-5'>
					You were passed a golden juggling club!
				</h3>
				{error && (
					<div className='alert alert-danger my-2'>{error}</div>
				)}
				<form>
					{step === 0 && <Step0 state={state} dispatch={dispatch} />}
					{step === 1 && <Step1 dispatch={dispatch} state={state} />}
					{step === 2 && <Step2 dispatch={dispatch} state={state} />}
					{step === 3 && <Step3 dispatch={dispatch} state={state} />}
					{step === 4 && <Step4 dispatch={dispatch} state={state} />}
					{step === 5 && success && (
						<Step5 state={state} clubID={clubID} />
					)}
					<div className='form-group d-flex justify-content-around'>
						<button
							className='btn btn-secondary'
							onClick={handlePreviousButton}
							disabled={step === 0}
						>
							Previous
						</button>
						<button
							className='btn btn-primary'
							onClick={handleNextButton}
						>
							{step === 4 ? 'Create Account' : 'Next Step'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withFirebase(RegisterPage);
