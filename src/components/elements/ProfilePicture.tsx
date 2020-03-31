import React, { useEffect, useState, FunctionComponent } from 'react';
import { withFirebase } from '../Firebase/context';
import Firebase from './../Firebase/index';

interface ProfilePictureInterface {
	firebase: Firebase;
	userID: string;
	centered: boolean;
	size: Array<number>;
}

interface IUser {
	photoURL: string;
	username: string;
}

const ProfilePicture: FunctionComponent<ProfilePictureInterface> = ({
	firebase,
	userID,
	size,
	centered
}) => {
	const [userData, setUserData] = useState<IUser | null>(null);

	useEffect(() => {
		firebase
			.getUserDataFromUID(userID)
			.then(res => setUserData(res.data()));
	}, [firebase, userID]);
	return userData && userData.photoURL && userData.photoURL !== '' ? (
		<img
			src={userData.photoURL}
			alt={'profile pic ' + userData.username}
			style={{
				width: size ? size[0] : 'auto',
				height: size ? size[1] : 'auto',
				objectFit: 'cover'
			}}
			className={
				'img-fluid rounded-circle ' +
				(centered ? 'd-block mx-auto' : '')
			}
		/>
	) : (
		userData && (
			<img
				src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/avatar-bg.png'
				alt={'profile pic ' + userData.username}
				style={{
					width: size ? size[0] : 'auto',
					height: size ? size[1] : 'auto',
					objectFit: 'cover'
				}}
				className={
					'img-fluid rounded-circle ' +
					(centered ? 'd-block mx-auto' : '')
				}
			/>
		)
	);
};

export default withFirebase(ProfilePicture);
