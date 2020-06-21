import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import Firebase from './../components/Firebase/index';
import { UserContextInterface } from '../components/Session/context';
export const sendGoldenClubEmail = (
	toEmail: string,
	fromName: string,
	clubID: string,
	setError: Dispatch<SetStateAction<string | null>>,
	setSuccess: Dispatch<SetStateAction<boolean>>,
	firebase: Firebase,
	userContext: UserContextInterface | null
) => {
	let parcel = {
		toEmail: toEmail,
		fromName: fromName,
		clubID: clubID,
	};
	setSuccess(false);
	setError(null);
	axios.post('./var/mail/pass-golden-club.php', parcel).then((res) => {
		if (res.data === 'fields') {
			setError('One of the required fields was empty...');
		} else if (res.data === 'email') {
			setError('The email address that you provided is invalid.');
		} else if (res.data === 'server') {
			setError(
				'There was an issue with the server. Please try again later!'
			);
		} else if (res.data === null) {
			setError(
				'Weird issues going on! Send an email to cal@objectepisodes.com and let him know about this message. Then, please try again.'
			);
		} else {
			firebase.db
				.collection('golden-clubs')
				.doc(clubID)
				.update({ sentTo: toEmail })
				.then(() => {
					firebase.db
						.collection('users')
						.doc(userContext?.auth.uid)
						.update({
							goldenClubs: firebase.dbFunc.FieldValue.ArrayRemove(
								clubID
							),
						});
				})
				.then(() => {
					setSuccess(true);
				})
				.catch((e: Error) => setError(e.message));
		}
	});
};
