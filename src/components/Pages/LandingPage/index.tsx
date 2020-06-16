import React, { FC, FormEvent } from 'react';

import emailjs from 'emailjs-com';

import logo from '../../../images/objectepisodes_logo.jpg';
import { useState, useEffect } from 'react';
import { withFirebase } from '../../Firebase/context';
import Firebase from './../../Firebase/index';

const LandingPage: FC<{ firebase: Firebase }> = (props) => {
	const { firebase } = props;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [betaTester, setBetaTester] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);
	const [message, setMessage] = useState<null | string>(null);

	useEffect(() => {
		emailjs.init('user_QdG9REKFW3zQjwPZCQrBF');
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setMessage(null);
		if (!betaTester) {
			firebase.db
				.collection('users')
				.where('email', '==', email)
				.get()
				.then((res: firebase.firestore.QuerySnapshot) => {
					if (res.docs[0]) {
						setBetaTester(true);
					} else {
						firebase.db
							.collection('mailing-list')
							.where('email', '==', email)
							.get()
							.then(
								(
									waitingListSnap: firebase.firestore.QuerySnapshot
								) => {
									if (waitingListSnap.docs[0]) {
										setError(
											'You are already subscribed to the mailing list!'
										);
									} else {
										firebase.db
											.collection('mailing-list')
											.add({
												email: email,
												timestamp: firebase.dbFunc.FieldValue.serverTimestamp(),
											})
											.then(
												(
													doc: firebase.firestore.DocumentReference
												) => {
													setMessage(
														'You have successfully subscribed! Sending confirmation email...'
													);
													emailjs
														.send(
															'default_service',
															'oe_mailing_list',
															{
																user_email: email,
																doc_id: doc.id,
															}
														)
														.then(() => {
															setMessage(
																'You have successfully subscribed! A confirmation email has been sent to the address that you provided.'
															);
														})
														.catch((e: Error) =>
															setError(e.message)
														);
												}
											)
											.catch((e: { message: string }) =>
												setError(e.message)
											);
									}
								}
							)
							.catch((e: { message: string }) =>
								setError(e.message)
							);
					}
				})
				.catch((e: { message: string }) => setError(e.message));
		} else {
			firebase
				.doLoginWithEmailAndPassword(email, password)
				.catch((e: { message: string }) => setError(e.message));
		}
	};
	return (
		<>
			<div className='row' style={{ height: '88vh' }}>
				<div className='col-12 col-md-6 m-auto text-center'>
					<img
						src={logo}
						alt='ObjectEpisodes.com'
						className='img-fluid d-block m-auto'
					/>
					<h1 className='display-4 text-center'>is returning...</h1>
					<hr />
					<form onSubmit={handleSubmit}>
						{error && (
							<div className='alert alert-danger'>{error}</div>
						)}
						{message && (
							<div className='alert alert-success'>{message}</div>
						)}
						<div className='form-group'>
							<label htmlFor='email'>
								Enter your email address to either <b>login</b>{' '}
								or <b>subscribe to the mailing list</b> to be
								informed about updates and account releases.
							</label>
							<input
								id='email'
								type='email'
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='form-control'
								placeholder='Email Address'
							/>
						</div>
						{betaTester && (
							<input
								type='password'
								name='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='form-control'
								placeholder='Password'
							/>
						)}
						<input
							type='submit'
							className='btn btn-primary mt-2'
							value={betaTester ? 'Login' : 'Subscribe'}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default withFirebase(LandingPage);
