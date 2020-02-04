import React from 'react';

import logo from '../../../images/objectepisodes_logo.jpg';
import { useState } from 'react';
import { withFirebase } from '../../Firebase/context';

const LandingPage = props => {
	const { firebase } = props;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [betaTester, setBetaTester] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const handleSubmit = e => {
		e.preventDefault();
		setError(null);
		setMessage(null);
		if (!betaTester) {
			firebase.db
				.collection('users')
				.where('email', '==', email)
				.get()
				.then(res => {
					if (res.docs[0]) {
						setBetaTester(true);
					} else {
						firebase.db
							.collection('mailing-list')
							.where('email', '==', email)
							.get()
							.then(waitingListSnap => {
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
										.then(user => {
											setMessage(
												'You have successfully subscribed!'
											);
										})
										.catch(e => setError(e.message));
								}
							})
							.catch(e => setError(e.message));
					}
				})
				.catch(e => setError(e.message));
		} else {
			firebase
				.doLoginWithEmailAndPassword(email, password)
				.catch(e => setError(e.message));
		}
	};
	return (
		<>
			<div className='row'>
				<div className='col-12 col-md-6 mx-auto text-center'>
					<img
						src={logo}
						alt='ObjectEpisodes.com'
						className='img-fluid d-block m-auto'
					/>
					<h1 className='display-4 text-center'>Is returning...</h1>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 col-md-6 mx-auto text-center'>
					<hr />
					<p>
						Subscribe to our mailing list to be the first to know
						about updates!
					</p>
					<form onSubmit={handleSubmit}>
						{error && (
							<div className='alert alert-danger'>{error}</div>
						)}
						{message && (
							<div className='alert alert-success'>{message}</div>
						)}
						<input
							type='email'
							name='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='form-control'
							placeholder='Email Address'
						/>
						{betaTester && (
							<input
								type='password'
								name='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								className='form-control'
								placeholder='Password'
							/>
						)}
						<input
							type='submit'
							className='btn btn-primary mt-2'
							value={betaTester ? 'Login' : 'Subscribe!'}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default withFirebase(LandingPage);
