import React from 'react';

const UserDetails = props => {
	const { userData } = props;
	return (
		<div className='card'>
			<div className='card-body'>
				<ul className='list-unstyled'>
					<li>
						Name:{' '}
						<b>
							{userData.data().firstname +
								' ' +
								userData.data().lastname}
						</b>
					</li>
					<li>
						Username: <b>{userData.data().username}</b>
					</li>
					<li>
						Account Created:{' '}
						<b>
							{userData
								.data()
								.created.toDate()
								.toDateString()}
						</b>
					</li>
					<li>
						Forum Posts: <b>{userData.data().forumPosts}</b>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserDetails;
