import React from 'react';

const PersonalRecordRow = props => {
	const {
		recordData,
		noOfProps,
		propType,
		pattern,
		recordType,
		recorded,
		videoURL,
	} = props;
	return (
		<div className='row align-items-center'>
			<div className='col'>
				{recordType === 'catches' ? (
					<p>
						{noOfProps} {propType} {pattern} for{' '}
						{recordData.catches} catches
					</p>
				) : (
					<p>
						{noOfProps} {propType} {pattern} for {recordData.time}{' '}
						minutes
					</p>
				)}
			</div>
			<div className='col'>
				{videoURL === '' ? (
					<p>No Video</p>
				) : (
					<a target="_blank" rel="noopener noreferrer" href={videoURL}>Video</a>
				)}
			</div>
			<div className='col'>
				<p>{recorded.toDate().toDateString()}</p>
			</div>
		</div>
	);
};

export default PersonalRecordRow;
