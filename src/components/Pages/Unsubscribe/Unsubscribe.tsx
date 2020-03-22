import React, { useState, useEffect, FC } from 'react';

import ObjectEpisodesLogo from '../../../images/objectepisodes_logo.jpg';
import { useParams } from 'react-router-dom';
import { withFirebase } from '../../Firebase/context';
import Firebase from './../../Firebase/config';

const Unsubscribe: FC<{ firebase: Firebase }> = props => {
	const { firebase } = props;
	const { docID } = useParams();
	const [unsubIDIsValid, setUnsubIDIsValid] = useState<boolean>(false);

	const [unsubbed, setUnsubbed] = useState<boolean>(false);

	useEffect(() => {
		if (docID) {
			const mailingListRef: firebase.firestore.DocumentReference = firebase.db
				.collection('mailing-list')
				.doc(docID);
			mailingListRef
				.get()
				.then((res: firebase.firestore.DocumentSnapshot) => {
					if (res.exists) {
						setUnsubIDIsValid(true);
						mailingListRef
							.delete()
							.then(() => setUnsubbed(true))
							.catch(() => setUnsubIDIsValid(false));
					}
				});
		}
	}, [props, docID, firebase.db]);

	return (
		<div className='container h-100'>
			<div className='row mb-3'>
				<div className='col-12'>
					<a href='/#'>
						<img
							src={ObjectEpisodesLogo}
							alt='ObjectEpisodes Logo'
							className='img-fluid'
						/>
					</a>
				</div>
			</div>
			<div className='row h-50'>
				<div className='col-12 col-sm-10 col-md-8 col-lg-6 m-auto text-center'>
					<div className='card'>
						{!unsubIDIsValid ? (
							<div className='card-body'>
								<h4>Hey There!</h4>
								<p>
									It seems as though you're trying to
									unsubscribe from our mailing list.
									Unfortunately, something has gone wrong and
									we were unable to find you on the register
									at all.
									<br />
									Please try clicking on the link in your
									email again, or if the problem persists,
									contact{' '}
									<a href='mailto:cal@objectepisodes.com'>
										cal@objectepisodes.com
									</a>{' '}
									for further help.
								</p>
							</div>
						) : (
							<div className='card-body'>
								<h4>We're sorry to see you go!</h4>
								{!unsubbed ? (
									<>
										<p>Unsubscribing...</p>

										<span className='spinner-border'></span>
									</>
								) : (
									<div className='alert alert-danger'>
										You have successfully unsubscribed.
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='row h-50'>
				<div className='col m-auto text-center'>
					<a href='/#'>Back to objectepisodes.com</a>
				</div>
			</div>
		</div>
	);
};

export default withFirebase(Unsubscribe);
