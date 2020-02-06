import React from 'react';

import { withFirebase } from '../../Firebase/context';
import { withAuth } from '../../Session/withAuth';

import logo from '../../../images/objectepisodes_logo.jpg';
import FiveStars from './FiveStars';
import { useState } from 'react';

const GiveFeedback = props => {
	const { firebase, user } = props;

	const [rating, setRating] = useState([1, 1, 1, 0, 0]);
	const [ratingCanChange, setRatingCanChange] = useState(true);

	const [message, setMessage] = useState('');

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleFeedbackSubmit = () => {
		user &&
			firebase.getUserDataFromUID(user.uid).then(userData => {
				firebase.db
					.collection('feedback')
					.add({
						name: user.displayName,
						username: userData.data().username,
						userID: user.uid,
						email: user.email,
						timestamp: firebase.dbFunc.FieldValue.serverTimestamp(),
						message: message,
						rating: rating,
					})
					.then(res => {
						setSuccess(true);
					})
					.catch(e => setError(e.message));
			});
	};

	return (
		<>
			<button
				type='button'
				className='btn btn-link text-white'
				data-toggle='modal'
				data-target='#giveFeedbackModal'>
				Give Feedback
			</button>

			<div
				className='modal fade text-dark'
				id='giveFeedbackModal'
				tabIndex='-1'
				role='dialog'
				aria-labelledby='giveFeedbackModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-header d-block'>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
							<img
								src={logo}
								alt='Object Episodes logo'
								className='img-fluid'
							/>
							<h5
								className='modal-title'
								id='giveFeedbackModalLabel'>
								Give Feedback
							</h5>
						</div>
						<div className='modal-body'>
							<FiveStars
								rating={rating}
								setRating={setRating}
								ratingCanChange={ratingCanChange}
								setRatingCanChange={setRatingCanChange}
							/>
							{!user && (
								<div className='alert alert-warning'>
									You must be <a href='#/login'>logged in</a>{' '}
									to give feedback.
								</div>
							)}
							{error && (
								<div className='alert alert-danger'>
									{error}
								</div>
							)}
							{success && (
								<div className='alert alert-success'>
									Your feedback has been sent!
								</div>
							)}
							<textarea
								name='feedback'
								cols='30'
								rows='10'
								className='form-control'
								value={message}
								onChange={e =>
									setMessage(e.target.value)
								}></textarea>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-dismiss='modal'>
								Close
							</button>
							<button
								type='button'
								className='btn btn-primary'
								onClick={handleFeedbackSubmit}>
								Send Feedback
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default withAuth(withFirebase(GiveFeedback));
