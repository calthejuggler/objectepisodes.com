import React, { useState, FC, useEffect } from 'react';
import Spinner from '../../elements/Spinner';
import { withAuth } from '../../Session/withAuth';
import Firebase from './../../Firebase/index';
import { withFirebase } from './../../Firebase/context';

const GoldenClubs: FC<{ user: any; firebase: Firebase }> = ({
	user,
	firebase,
}) => {
	const [
		goldenClubs,
		setGoldenClubs,
    ] = useState<firebase.firestore.QuerySnapshot | null>(null);
    

	return (
		<div className='row'>
			<div className='col-12 col-md-6 m-auto text-center py-5'>
				{goldenClubs ? (
					<>
						<h3 className='display-4'>
							Pass a Golden Juggling Club!
						</h3>
						<p>
							You have <b>{goldenClubs.docs.length}</b> Golden
							Juggling Clubs. Invite your friends to create their
							own accounts on Object Episodes.
						</p>
						<input type='email' className='form-control' />
					</>
				) : (
					<Spinner />
				)}
			</div>
		</div>
	);
};

export default withFirebase(withAuth(GoldenClubs));
