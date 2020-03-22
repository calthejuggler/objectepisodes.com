import React, { useEffect, Dispatch, SetStateAction, FC } from 'react';
import { withAuth } from '../../../Session/withAuth';

interface Props {
	user: { photoURL: string };
	handleFileUpload: () => void;
	storageRef: any;
	setStorageRef: Dispatch<SetStateAction<any>>;
	imageLoading: boolean;
	setImageLoading: Dispatch<SetStateAction<boolean>>;
}

const UploadProfilePicture: FC<Props> = props => {
	const {
		user,
		handleFileUpload,
		storageRef,
		setStorageRef,
		imageLoading,
		setImageLoading
	} = props;

	useEffect(() => {
		if (user) setStorageRef(user.photoURL);
		setImageLoading(false);
	}, [user, setStorageRef, setImageLoading]);

	return (
		<div className='row align-items-center'>
			<div className='col-12 col-md-4'>
				{!imageLoading ? (
					<img
						className='img-fluid rounded-circle d-block mx-auto'
						style={{
							width: '150px',
							height: '150px',
							objectFit: 'cover'
						}}
						src={storageRef}
						alt='Profile Preview'
					/>
				) : (
					<div
						className='spinner-border mx-auto d-block'
						role='status'
					>
						<span className='sr-only'>Loading...</span>
					</div>
				)}
			</div>
			<div className='col-12 col-md-8'>
				<div className='form-group'>
					<label htmlFor='profilepic'>Upload Image</label>
					<input
						type='file'
						name='profilepic'
						id='profilePic'
						className='form-control-file'
						onChange={handleFileUpload}
					/>
				</div>
			</div>
		</div>
	);
};

export default withAuth(UploadProfilePicture);
