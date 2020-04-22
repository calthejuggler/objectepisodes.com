import React from 'react';

const AddPhoto = () => {
	return (
		<div className='col-12 col-md-9'>
			<h3 className='text-center'>Add Photo</h3>
			<form>
				<div className='input-group'>
					<div className='input-group-prepend'>
						<span
							className='input-group-text'
							id='uploadFilesButton'
						>
							Upload Files:
						</span>
					</div>
					<div className='custom-file'>
						<input
							type='file'
							id='photoUpload'
							className='custom-file-input'
							aria-describedby='uploadFilesButton'
						/>
						<label
							htmlFor='photoUpload'
							className='custom-file-label'
						>
							Choose files:
						</label>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddPhoto;
