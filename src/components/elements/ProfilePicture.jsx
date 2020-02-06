import React, { useEffect, useState } from 'react';
import { withFirebase } from '../Firebase/context';

const ProfilePicture = props => {
	const { firebase, userID, size, centered } = props;

	const [userData, setUserData] = useState(null);

	useEffect(() => {
		firebase
			.getUserDataFromUID(userID)
			.then(res => setUserData(res.data()));
	}, [firebase, userID]);
	return (
		userData && (
			<img
				src={userData.photoURL}
				alt={'profile pic ' + userData.username}
				style={{
					width: size ? size[0] : 'auto',
					height: size ? size[1] : 'auto',
					objectFit: 'cover',
				}}
				className={
					'img-fluid rounded-circle ' +
					(centered && 'd-block mx-auto')
				}
			/>
		)
	);
};

export default withFirebase(ProfilePicture);
