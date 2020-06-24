import React, { FC, Dispatch, ChangeEvent, useRef, useEffect } from 'react';

const Step3: FC<{
	dispatch: Dispatch<{ type: string; payload?: any }>;
	state: { photo: File | null };
}> = ({ dispatch, state }) => {
	const { photo } = state;

	const imageRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (photo && imageRef.current) {
			const tempURL = URL.createObjectURL(photo);
			imageRef.current.src = tempURL;
			return URL.revokeObjectURL(tempURL);
		}
	}, [photo]);

	const validateprofilePhoto = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files) {
			const tempFile = e.currentTarget.files[0];
			if (tempFile.type !== 'image/jpeg' && tempFile.type !== 'image/png')
				dispatch({
					type: 'set-error',
					payload:
						'Your profile picture must be either a .jpg or a .png file.',
				});
			else if (tempFile.size > 2000000)
				dispatch({
					type: 'set-error',
					payload:
						'Your profile picture must smaller than 2MB in size.',
				});
			else
				dispatch({
					type: 'change-field',
					payload: {
						field: 'photo',
						value: e.currentTarget.files
							? e.currentTarget.files[0]
							: null,
					},
				});
		} else {
			return;
		}
	};

	return (
		<>
			<div className='form-group'>
				<label htmlFor='thumbnail'>
					Profile Picture:
					<span className='text-danger'>*</span>
				</label>
				<div className='input-group'>
					<div className='input-group-prepend'>
						<span
							className='input-group-text'
							id='inputGroupFileAddon01'
						>
							Upload
						</span>
					</div>
					<div className='custom-file'>
						<input
							type='file'
							className='custom-file-input'
							id='inputGroupFile01'
							aria-describedby='inputGroupFileAddon01'
							onChange={validateprofilePhoto}
						/>
						<label
							className='custom-file-label'
							htmlFor='inputGroupFile01'
							style={{ overflow: 'hidden' }}
						>
							{photo ? photo.name : 'Choose file'}
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default Step3;
