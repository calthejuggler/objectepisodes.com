import React, { FC, useReducer, useEffect, FormEvent } from 'react';
import { withFirebase } from '../../../Firebase/context';
import UploadProfilePicture from './UploadProfilePicture';
import { withAuth } from '../../../Session/withAuth';
import Firebase from '../../../Firebase/index';
import { UserContextInterface } from '../../../Session/context';
import { personalReducer } from '../reducers/personalReducer';
import Spinner from '../../../elements/Spinner';

interface Props {
	firebase: Firebase;
	user: UserContextInterface;
}

export const initialState = {
	firstname: '',
	lastname: '',
	email: '',
	error: null,
	uploadedImg: null,
	imgURL: null,
	loading: true,
	changed: true,
	success: false,
};

const EditProfilePersonalForm: FC<Props> = ({ firebase, user }) => {
	const [state, dispatch] = useReducer(personalReducer, initialState);

	const {
		firstname,
		lastname,
		email,
		error,
		loading,
		changed,
		uploadedImg,
		success,
	} = state;

	useEffect(() => {
		user
			? dispatch({
					type: 'change-field',
					payload: {
						firstname: user.displayName?.split(' ')[0],
						lastname: user.displayName
							?.split(' ')
							.slice(1)
							.join(' '),
						email: user.email,
						imgURL: user.photoURL,
						loading: false,
						changed: false,
					},
			  })
			: dispatch({
					type: 'change-field',
					payload: {
						error:
							'We had trouble getting your user info from the server... Please refresh and try again!',
					},
			  });
	}, [user]);

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!changed)
			return dispatch({
				type: 'set-error',
				payload: 'Nothing has been changed!',
			});
		if (firstname === '' || lastname === '')
			return dispatch({
				type: 'set-error',
				payload: 'Your name is required!',
			});
		dispatch({ type: 'set-loading', payload: true });
		if (uploadedImg)
			firebase
				.doChangeProfilePicture(uploadedImg, user)
				.then(() =>
					user?.updateProfile({
						displayName: `${firstname} ${lastname}`,
					})
				)
				.then(() =>
					firebase.db.collection('users').doc(user?.uid).update({
						firstname: firstname,
						lastname: lastname,
					})
				)
				.then(() => {
					dispatch({ type: 'success' });
				})
				.catch((e: Error) =>
					dispatch({
						type: 'set-error',
						payload: e.message,
					})
				);
		else
			user?.updateProfile({
				displayName: `${firstname} ${lastname}`,
			})
				.then(() =>
					firebase.db
						.collection('users')
						.doc(user?.uid)
						.update({ firstname: firstname, lastname: lastname })
				)
				.then(() => dispatch({ type: 'success' }))
				.catch((e: Error) =>
					dispatch({ type: 'set-error', payload: e.message })
				);
	};

	return loading ? (
		<Spinner />
	) : (
		<>
			{success && (
				<div className='alert alert-success text-center'>
					Your changes have been made. Go to the{' '}
					<a href='#/'>homepage</a> to refresh!
				</div>
			)}
			<hr />
			<h5 className='text-center'>Profile Picture</h5>
			<UploadProfilePicture state={state} dispatch={dispatch} />
			{error && <div className='alert alert-danger'>{error}</div>}
			<hr />
			<h5 className='text-center'>Account Details</h5>
			<form onSubmit={handleFormSubmit}>
				<div className='row'>
					<div className='col'>
						<div className='form-group'>
							<label htmlFor='firstname'>First Name:</label>
							<input
								type='text'
								value={firstname}
								onChange={(e) =>
									dispatch({
										type: 'change-field',
										payload: {
											firstname: e.currentTarget.value,
											changed: true,
										},
									})
								}
								className='form-control'
							/>
						</div>
					</div>
					<div className='col'>
						<div className='form-group'>
							<label htmlFor='lastname'>Last Name:</label>
							<input
								type='text'
								value={lastname}
								onChange={(e) =>
									dispatch({
										type: 'change-field',
										payload: {
											lastname: e.currentTarget.value,
											changed: true,
										},
									})
								}
								className='form-control'
							/>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<div className='form-group'>
							<label htmlFor='email'>Email Address:</label>
							<input
								type='email'
								name='email'
								id='email'
								className='form-control'
								disabled
								value={email}
							/>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<button
							type='submit'
							className='btn btn-primary mr-3'
							disabled={!changed}
						>
							Save Changes
						</button>
						<button
							className='btn btn-secondary'
							onClick={(e) => {
								e.preventDefault();
								dispatch({
									type: 'change-field',
									payload: {
										firstname: user?.displayName?.split(
											' '
										)[0],
										lastname: user?.displayName
											?.split(' ')
											.slice(1)
											.join(' '),
										email: user?.email,
										imgURL: user?.photoURL,
										loading: false,
										changed: false,
										uploadedImg: null,
									},
								});
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default withAuth(withFirebase(EditProfilePersonalForm));
