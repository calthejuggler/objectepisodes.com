import React, { FC } from 'react';

const MostRecord: FC<{
	recordProp: { record: any; user: any };
	title: string;
}> = props => {
	const { recordProp, title } = props;

	return (
		<>
			<div className='col-5'>
				<p>
					<b>{title}</b>
				</p>
			</div>
			<div className='col-7 text-center'>
				<a href={'#/user/' + recordProp.user.data().username}>
					<div className='row align-items-center justify-content-center'>
						<img
							src={recordProp.user.data().photoURL}
							alt='record User profile'
							style={{
								width: '30px',
								height: '30px',
								objectFit: 'cover'
							}}
							className='rounded-circle mr-lg-3'
						/>
						{recordProp.user.data().username}
					</div>
				</a>
				<p>
					{recordProp.record.data().noOfProps} ball{' '}
					{recordProp.record.data().pattern} for{' '}
					{recordProp.record.data().recordType === 'catches'
						? recordProp.record.data().catches + ' catches'
						: recordProp.record.data().time + ' minutes'}
				</p>
			</div>
		</>
	);
};

export default MostRecord;
