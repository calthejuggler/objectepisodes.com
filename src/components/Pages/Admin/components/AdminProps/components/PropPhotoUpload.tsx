import React, { FC, Dispatch, SetStateAction, MouseEvent } from 'react';

const PropPhotoUpload: FC<{
	photo: { file: File; uploaded: boolean } | null;
	setPhoto: Dispatch<
		SetStateAction<{ file: File; uploaded: boolean } | null>
	>;
}> = ({ photo, setPhoto }) => {
	const handlePhotoSelect = (selectorFiles: FileList) => {
		setPhoto({ file: selectorFiles[0], uploaded: false });
	};

	const handlePhotoUpload = (e: MouseEvent) => {
		e.preventDefault();
	};
	return (
		<div className='row my-3 align-items-center'>
			<div className='col-12 col-md-6'>
				{photo ? (
					<div className='row'>
						<div className='col'>{photo.file.name}</div>
						<div className='col'>
							<button
								className='btn btn-primary'
								onClick={(e) => handlePhotoUpload(e)}
							>
								Upload Photo
							</button>
						</div>
					</div>
				) : (
					'No image has been set.'
				)}
			</div>
			<div className='col-12 col-md-6'>
				<h5>Photo</h5>
				<div className='custom-file'>
					<input
						type='file'
						name='addPropPhoto'
						id='addPropPhoto'
						className='custom-file-input'
						onChange={(e) =>
							e.target.files && handlePhotoSelect(e.target.files)
						}
					/>
					<label htmlFor='addPropPhoto' className='custom-file-label'>
						Choose Photo
					</label>
				</div>
			</div>
		</div>
	);
};

export default PropPhotoUpload;
