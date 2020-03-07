import React, { FC } from 'react';

interface Props {
	recordData: any;
	noOfProps: number;
	propType: string;
	pattern: string;
	recordType: string;
	recorded: any;
	videoURL: string;
}

const PersonalRecordRow: FC<Props> = props => {
	const {
		recordData,
		noOfProps,
		propType,
		pattern,
		recordType,
		recorded,
		videoURL
	} = props;
	return (
		<div className='row align-items-center'>
			<div className='col-4'>
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
			<div className='col-4'>
				{videoURL === '' ? (
					<p>No Video</p>
				) : (
					<a
						target='_blank'
						rel='noopener noreferrer'
						href={videoURL}
					>
						Video
					</a>
				)}
			</div>
			<div className='col-4'>
				<p>{recorded.toDate().toDateString()}</p>
			</div>
		</div>
	);
};

export default PersonalRecordRow;
