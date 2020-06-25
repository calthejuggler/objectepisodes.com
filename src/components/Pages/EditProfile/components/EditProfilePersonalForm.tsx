import React, {
	useState,
	Dispatch,
	SetStateAction,
	FC,
	ChangeEvent,
} from 'react';
import { withFirebase } from '../../../Firebase/context';
import UploadProfilePicture from './UploadProfilePicture';
import { withAuth } from '../../../Session/withAuth';
import Firebase from './../../../Firebase/index';
import { UserContextInterface } from '../../../Session/context';

interface Props {
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	setFirstname: Dispatch<SetStateAction<string>>;
	setLastname: Dispatch<SetStateAction<string>>;
	setEmail: Dispatch<SetStateAction<string>>;
	setUsername: Dispatch<SetStateAction<string>>;
	firebase: Firebase;
	user: UserContextInterface;
}

const EditProfilePersonalForm: FC<Props> = (props) => {
	const {
		firstname,
		lastname,
		email,
		username,
		setFirstname,
		setLastname,
		setEmail,
		setUsername,
		firebase,
		user,
	} = props;

	const [storageRef, setStorageRef] = useState('');

	const [img, setImg] = useState<null | File>(null);
	const [imageLoading, setImageLoading] = useState(true);

	const [error, setError] = useState<null | string>(null);

	const handleFileUpload = (e: ChangeEvent<{ files: File[] }>): void => {
		setImageLoading(true);
		let uid = user?.uid;
		let file = e.target.files[0];

		if (file.size > 2000000) {
			setError('Your image must be under 2MB');
		} else if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
			setError('Your image must have a .jpg or a .png extension.');
		} else {
			setError(null);
			setImg(file);
			const firebaseQuery = firebase.storage.ref(
				'profile-pictures/' + user?.uid.trim()
			);
			firebaseQuery.put(file).then((snap: any) => {
				snap.ref
					.getDownloadURL()
					.then((url: any) => {
						setStorageRef(url);
						user?.updateProfile({ photoURL: url }).then(() => {
							firebase.db
								.collection('users')
								.doc(user?.uid)
								.update({ photoURL: url })
								.then(() => {
									setImageLoading(false);
								});
						});
					})
					.catch((e: { message: string }) => setError(e.message));
			});
		}
	};

	const [usernameTaken, setUsernameTaken] = useState(false);
	const [usernameLoading, setUsernameLoading] = useState(false);

	return (
		<>
			<hr />
			<h5 className='text-center'>Profile Picture</h5>
			<UploadProfilePicture
				handleFileUpload={handleFileUpload}
				storageRef={storageRef}
				setStorageRef={setStorageRef}
				img={img}
				setImg={setImg}
				imageLoading={imageLoading}
				setImageLoading={setImageLoading}
			/>
			{error && <div className='alert alert-danger'>{error}</div>}
			<hr />
			<h5 className='text-center'>Account Details</h5>
			<div className='row'>
				<div className='col'>
					<div className='form-group'>
						<label htmlFor='firstname'>First Name:</label>
						<input
							type='text'
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							className='form-control'
						/>
					</div>
				</div>
				<div className='col'>
					<div className='form-group'>
						<label htmlFor='lastname'>Last Name:</label>
						<input
							type='text'
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							className='form-control'
						/>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-12'>
					<div className='form-group'>
						<label htmlFor='username'>Username:</label>
						<input
							type='text'
							className='form-control'
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
								setUsernameLoading(true);
								firebase.db
									.collection('users')
									.where('username', '==', e.target.value)
									.get()
									.then((ans: any) => {
										setUsernameLoading(false);
										if (
											!ans.empty &&
											ans.docs[0].id !== user?.uid
										) {
											setUsernameTaken(true);
										} else {
											setUsernameTaken(false);
										}
									});
							}}
						/>

						{usernameTaken ? (
							<div className='alert alert-danger'>
								This username is taken.
								{usernameLoading && (
									<div
										className='spinner-border'
										role='status'
									>
										<span className='sr-only'>
											Loading...
										</span>
									</div>
								)}
							</div>
						) : (
							<div className='alert alert-success'>
								This username is available.
								{usernameLoading && (
									<div
										className='spinner-border'
										role='status'
									>
										<span className='sr-only'>
											Loading...
										</span>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-12'>
					<div className='form-group'>
						<label htmlFor='email'>Email Address:</label>
						<input
							type='email'
							name='email'
							id='email'
							className='form-control'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default withAuth(withFirebase(EditProfilePersonalForm));
