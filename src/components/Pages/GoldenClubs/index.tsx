import React, { useState, FC, useEffect, FormEvent } from 'react';
import Spinner from '../../elements/Spinner';
import { withAuth } from '../../Session/withAuth';
import Firebase from './../../Firebase/index';
import { withFirebase } from './../../Firebase/context';
import { UserContextInterface } from '../../Session/context';
import { sendGoldenClubEmail } from './../../../functions/mail';

const GoldenClubs: FC<{
	user: null | UserContextInterface;
	firebase: Firebase;
}> = ({ user, firebase }) => {
	const [goldenClubs, setGoldenClubs] = useState<string[] | null>(null);

	const [email, setEmail] = useState<string>('');

	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);

	useEffect(() => {
		user && setGoldenClubs(user.data?.goldenClubs);
	}, [user]);

	const handleGoldenClubPass = (e: FormEvent) => {
		e.preventDefault();
		firebase.db
			.collection('users')
			.where('email', '==', email)
			.get()
			.then((res: firebase.firestore.QuerySnapshot) => {
				!res.empty
					? setError('This user already has an account!')
					: !user?.auth.displayName
					? setError('You must set your display name first!')
					: !goldenClubs
					? setError('You have no golden clubs to pass out!')
					: sendGoldenClubEmail(
							email,
							user.auth.displayName,
							goldenClubs[0],
							setError,
							setSuccess,
							firebase,
							user
					  );
			});
	};

	return (
		<div className='row'>
			<div className='col-12 col-md-8 m-auto text-center py-5'>
				{goldenClubs ? (
					<>
						<h3 className='display-4'>
							Pass a Golden Juggling Club!
						</h3>
						<p>
							You have <b>{goldenClubs.length}</b> Golden Juggling
							Clubs. Invite your friends to create their own
							accounts on Object Episodes.
						</p>
						<form onSubmit={handleGoldenClubPass}>
							{success && (
								<div className='alert alert-success'>
									Club successfully passed! Hopefully they
									catch it.
								</div>
							)}
							{error && (
								<div className='alert alert-danger'>
									{error}
								</div>
							)}
							<div className='form-group'>
								<label htmlFor='email'>
									Enter Email Address:
								</label>
								<input
									type='email'
									name='email'
									className='form-control'
									value={email}
									onChange={(e) =>
										setEmail(e.currentTarget.value)
									}
								/>
							</div>
							<button type='submit' className='btn btn-primary'>
								Pass Club
							</button>
						</form>
					</>
				) : (
					<Spinner />
				)}
			</div>
		</div>
	);
};

export default withFirebase(withAuth(GoldenClubs));
