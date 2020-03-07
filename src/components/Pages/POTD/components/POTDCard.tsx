import React, { FC } from 'react';

const POTDCard: FC<{ photoData: { photo: any; user: any } }> = props => {
	const { photoData } = props;
	return (
		<div className='col-12 col-md m-2'>
			<div className='card'>
				<div className='card-body'>
					<img
						src={photoData.photo.data().photoUrl}
						alt=''
						className='img-fluid'
					/>
					<div className='row text-center'>
						<div className='col-6'>
							<b>Uploaded by:</b> <br />
							<a href={'#/user/' + photoData.user.data().uid}>
								{photoData.user.data().username}
							</a>
						</div>
						<div className='col-6'>
							<b>Shown:</b> <br />
							{photoData.photo
								.data()
								.shown.toDate()
								.toUTCString()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default POTDCard;
