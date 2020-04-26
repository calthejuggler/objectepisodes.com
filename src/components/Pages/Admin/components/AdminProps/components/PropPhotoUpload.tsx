import React, { FC, Dispatch, SetStateAction, MouseEvent } from 'react';
import Firebase from './../../../../../Firebase/config';

const PropPhotoUpload: FC<{
	photo: { file: File; uploaded: boolean } | null;
	setPhoto: Dispatch<
		SetStateAction<{ file: File; uploaded: boolean } | null>
	>;
	setError: Dispatch<SetStateAction<string | null>>;
	firebase: Firebase;
	handlePhotoUpload: (e: MouseEvent) => void;
	photoURL: string | null;
	uploadState: string | null;
}> = ({
	photo,
	setPhoto,
	firebase,
	setError,
	handlePhotoUpload,
	photoURL,
	uploadState,
}) => {
	const handlePhotoSelect = (selectorFiles: FileList) => {
		selectorFiles[0] &&
			firebase.storage
				.ref()
				.child('prop-images/' + selectorFiles[0].name)
				.getDownloadURL()
				.then(() => {
					setError(
						'A file with this name has already been uploaded... Please choose another or rename it.'
					);
					setPhoto(null);
				})
				.catch((e: { code: string; message: string }) => {
					if (e.code === 'storage/object-not-found') {
						setError(null);
						setPhoto({ file: selectorFiles[0], uploaded: false });
					} else {
						setError(e.message);
					}
				});
	};

	const handleDeletePhoto = (e: MouseEvent) => {
		e.preventDefault();
		photo &&
			firebase.storage
				.ref()
				.child('prop-images/' + photo.file.name)
				.delete()
				.then(() => setPhoto(null))
				.catch((e: Error) => setError(e.message));
	};
	return (
		<div className='row my-3 align-items-center'>
			<div className='col-12 col-md-6'>
				{!photo ? (
					'No image has been set.'
				) : !photo.uploaded ? (
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
				) : uploadState !== 'success' ? (
					<>
						<div className='spinner-border' role='status'>
							<span className='sr-only'>Uploading Image...</span>
						</div>
					</>
				) : (
					photoURL && (
						<>
							<img
								src={photoURL}
								className='img-fluid'
								alt={photo.file.name}
							/>
							<button
								className='btn btn-danger'
								onClick={handleDeletePhoto}
							>
								Delete Image
							</button>
						</>
					)
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
