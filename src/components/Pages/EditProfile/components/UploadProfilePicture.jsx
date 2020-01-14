import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../../Firebase/context';
import { withAuth } from '../../../Session/withAuth';

import ReactCrop from 'react-image-crop';

import 'react-image-crop/lib/ReactCrop.scss';

const UploadProfilePicture = props => {
	const {
		firebase,
		user,
		handleFileUpload,
		storageRef,
		setStorageRef,
		img,
		setImg,
	} = props;

	const [context, setContext] = useState(null);
	const [canvas, setCanvas] = useState(<canvas></canvas>);
	const [crop, setCrop] = useState({
		aspect: 1 / 1,
		unit: '%',
		width: 50,
		height: 50,
		x: 25,
		y: 25,
	});

	const handleCrop = crop => {
		setCrop(crop);
	};

	return (
		<div className='row align-items-center'>
			<div className='col-12 col-md-4'>
				{img && (
					<>
						<ReactCrop
							src={storageRef}
							onChange={crop => {
								handleCrop(crop);
							}}
							crop={crop}
							keepSelection={true}
							ruleOfThirds={true}
							circularCrop={true}
						/>
						<canvas ref={canvas => setCanvas(canvas)} />
					</>
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

export default withAuth(withFirebase(UploadProfilePicture));
