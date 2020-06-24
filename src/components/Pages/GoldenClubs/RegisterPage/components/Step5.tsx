import React, { useEffect, FC, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withFirebase } from '../../../../Firebase/context';
import Firebase from './../../../../Firebase/index';
import Spinner from '../../../../elements/Spinner';

interface Props extends RouteComponentProps {
	state: { goldenClubData: firebase.firestore.DocumentData };
	clubID: string;
	firebase: Firebase;
}

const Step5: FC<Props> = ({ history, firebase, state, clubID }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const { goldenClubData } = state;

	useEffect(() => {
		firebase.doDeleteGoldenClub(clubID).then(() => {
			setLoading(false);
			setTimeout(() => {
				history.push('/#/');
			}, 3000);
		});
	}, [history, clubID, firebase, goldenClubData.owner]);

	return loading ? (
		<Spinner>Implementing final touches...</Spinner>
	) : (
		<div className='alert alert-success'>
			You have successfully created your account and logged in!
			Redirecting you to the homepage...
		</div>
	);
};

export default withRouter(withFirebase(Step5));
