import React, { useState, MouseEvent, FC, useEffect } from 'react';
import { withFirebase } from './../../../../../Firebase/context';
import Firebase from './../../../../../Firebase/index';
import Spinner from '../../../../../elements/Spinner';

const GiveBadgeButton: FC<{
	firebase: Firebase;
	selectedUser: { id: string; data: firebase.firestore.DocumentData } | null;
}> = ({ firebase, selectedUser }) => {
	const [adminData, setAdminData] = useState<
		{ admin?: boolean; mod?: boolean; contributor?: boolean } | undefined
	>();

	const [loading, setLoading] = useState(false);

	const [changed, setChanged] = useState(false);

	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		return firebase.db
			.collection('users-admin-config')
			.doc(selectedUser?.id)
			.onSnapshot((adminSnap: firebase.firestore.DocumentSnapshot) => {
				if (adminSnap.exists) {
					setAdminData(adminSnap.data());
				}
			});
	}, [firebase.db, selectedUser]);

	const handleGiveBadgesClick = (e: MouseEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(false);
		setLoading(true);
		if (changed)
			firebase.db
				.collection('users-admin-config')
				.doc(selectedUser?.id)
				.set(adminData)
				.then(() => {
					setLoading(false);
					setSuccess(true);
					setChanged(false);
				})
				.catch((e: Error) => {
					setLoading(false);
					setError(e.message);
				});
		else setError("You haven't changed anything");
	};

	return (
		<>
			<button
				type='button'
				data-toggle='modal'
				data-target='#giveBadgeModal'
				className='btn btn-primary btn-sm'
			>
				Give Badge
			</button>

			<div
				className='modal fade'
				id='giveBadgeModal'
				tabIndex={-1}
				role='dialog'
				aria-labelledby='giveBadgeModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5
								className='modal-title'
								id='giveBadgeModalLabel'
							>
								Give Badge
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
											Badges successfully given!
										</div>
									)}
									<ul className='list-group list-group-flush'>
										<li className='list-group-item'>
											<div className='row'>
												<div className='col-4'>
													Admin
												</div>
												<div className='col-4'>
													{adminData?.admin
														? 'Yes'
														: 'No'}
												</div>
												<div className='col-4'>
													<button
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															setAdminData(
																(prev) => {
																	return {
																		...prev,
																		admin: prev?.admin
																			? false
																			: true,
																	};
																}
															);
															setChanged(true);
														}}
													>
														Toggle
													</button>
												</div>
											</div>
										</li>
										<li className='list-group-item'>
											<div className='row'>
												<div className='col-4'>
													Moderator
												</div>
												<div className='col-4'>
													{adminData?.mod
														? 'Yes'
														: 'No'}
												</div>
												<div className='col-4'>
													<button
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															setAdminData(
																(prev) => {
																	return {
																		...prev,
																		mod: prev?.mod
																			? false
																			: true,
																	};
																}
															);
															setChanged(true);
														}}
													>
														Toggle
													</button>
												</div>
											</div>
										</li>
										<li className='list-group-item'>
											<div className='row'>
												<div className='col-4'>
													Database Contributer
												</div>
												<div className='col-4'>
													{adminData?.contributor
														? 'Yes'
														: 'No'}
												</div>
												<div className='col-4'>
													<button
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															setAdminData(
																(prev) => {
																	return {
																		...prev,
																		contributor: prev?.contributor
																			? false
																			: true,
																	};
																}
															);
															setChanged(true);
														}}
													>
														Toggle
													</button>
												</div>
											</div>
										</li>
									</ul>
								</div>
								<div className='modal-footer'>
									<button
										type='button'
										className='btn btn-danger'
										onClick={handleGiveBadgesClick}
									>
										Give Badges
									</button>
									<button
										type='button'
										className='btn btn-secondary mr-auto'
                                        data-dismiss='modal'
									>
										Cancel
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

export default withFirebase(GiveBadgeButton);
