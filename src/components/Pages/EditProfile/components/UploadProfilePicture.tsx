import React, { Dispatch, FC, ChangeEvent } from 'react';
import { withAuth } from '../../../Session/withAuth';
import { UserContextInterface } from '../../../Session/context';

interface Props {
	user: UserContextInterface;
	state: {
		imgURL: string | null;
		uploadedImg: File | null;
		error: string | null;
	};
	dispatch: Dispatch<{ type: string; payload?: any }>;
}

const UploadProfilePicture: FC<Props> = ({ user, state, dispatch }) => {
	const { uploadedImg, imgURL } = state;
	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		let file = e.currentTarget.files && e.currentTarget.files[0];
		if (!file) return;
		if (file.size > 2000000) {
			dispatch({
				type: 'change-field',
				payload: { error: 'Your image must be under 2MB' },
			});
		} else if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
			dispatch({
				type: 'change-field',
				payload: {
					error: 'Your image must have a .jpg or a .png extension.',
				},
			});
		} else {
			dispatch({
				type: 'input-image',
				payload: file,
			});
		}
	};

	return (
		<div className='row align-items-center'>
			<div className='col-12'>
				{imgURL && (
					<img
						className='img-fluid rounded-circle d-block mx-auto mb-2'
						style={{
							width: '150px',
							height: '150px',
							objectFit: 'cover',
						}}
						src={imgURL}
						alt='Profile Preview'
					/>
				)}
			</div>
			<div className='col-12'>
				<div className='custom-file'>
					<input
						type='file'
						name='profilePic'
						id='profilePic'
						className='custom-file-input'
						onChange={handleFileUpload}
					/>
					<label htmlFor='profilePic' className='custom-file-label'>
						{!uploadedImg ? 'Choose Photo' : uploadedImg.name}
					</label>
				</div>
			</div>
		</div>
	);
};

export default withAuth(UploadProfilePicture);
