import React, { useState, MouseEvent, FC } from 'react';
import { withFirebase } from './../../../../../Firebase/context';
import Firebase from './../../../../../Firebase/index';
import { withAuth } from '../../../../../Session/withAuth';
import Spinner from '../../../../../elements/Spinner';

const GoldenClubsButton: FC<{ firebase: Firebase; user: any }> = ({
	firebase,
	user,
}) => {
	const [numberOfClubs, setNumberOfClubs] = useState<number>(0);

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleCreateClubsButtonClick = (e: MouseEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(false);
		setLoading(true);
		for (let i = 0; i < numberOfClubs; i++) {
			firebase.doCreateGoldenClubAndGiveToUser(user.uid).catch((e) => {
				setError(e.message);
			});
		}
		if (error === null) {
			setSuccess(true);
		}
		setLoading(false);
	};

	return (
		<>
			<button
				type='button'
				data-toggle='modal'
				data-target='#createGoldenClubsModal'
				className='btn btn-danger'
			>
				Create Golden Clubs
			</button>

			<div
				className='modal fade'
				id='createGoldenClubsModal'
				tabIndex={-1}
				role='dialog'
				aria-labelledby='createGoldenClubsModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5
								className='modal-title'
								id='createGoldenClubsModalLabel'
							>
								Create Golden Juggling Clubs
							</h5>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						{!loading ? (
							<>
								<div className='modal-body'>
									{error && (
										<div className='alert alert-danger'>
											{error}
										</div>
									)}
									{success && (
										<div className='alert alert-success'>
											Clubs successfully created!
										</div>
									)}
									<div className='form-group'>
										<label htmlFor='amountOfGoldenClubs'>
											Amount of Golden Clubs to Give:
										</label>
										<input
											type='number'
											className='form-control'
											name='amountOfGoldenClubs'
											id='amountOfGoldenClubsInput'
											value={numberOfClubs}
											onChange={(e) =>
												setNumberOfClubs(
													parseInt(e.target.value)
												)
											}
										/>
									</div>
								</div>
								<div className='modal-footer'>
									<button
										type='button'
										className='btn btn-secondary'
										data-dismiss='modal'
									>
										Close
									</button>
									<button
										type='button'
										className='btn btn-danger'
										onClick={handleCreateClubsButtonClick}
									>
										Create Golden Clubs
									</button>
								</div>
							</>
						) : (
							<Spinner />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default withAuth(withFirebase(GoldenClubsButton));
