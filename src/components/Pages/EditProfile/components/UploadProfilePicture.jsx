import React, { useState } from 'react';
import { withFirebase } from '../../../Firebase/context';

const UploadProfilePicture = props => {
	const { firebase } = props;
	const [storageRef, setStorageRef] = useState('');
	return (
		<div className='row align-items-center'>
			<div className='col-12 col-md-4'>
				<img
					src={storageRef[0]}
					alt='Profile pic placeholder'
					className='rounded-circle d-block mx-auto'
				/>
			</div>
			<div className='col-12 col-md-8'>
				<div className='form-group'>
					<label htmlFor='profilepic'>Upload Image</label>
					<input
						type='file'
						name='profilepic'
						id='profilePic'
						className='form-control-file'
						onChange={e => setStorageRef(e.target.files)}
					/>
				</div>
			</div>
		</div>
	);
};

export default withFirebase(UploadProfilePicture);
