import React from 'react';
import { withRouter } from 'react-router-dom';

const UserDetails = props => {
	const { userData, ownProfile, history } = props;
	return (
		<div className='card'>
			<div className='card-body'>
				<img
					src='https://via.placeholder.com/150x150'
					alt='Profile pic placeholder'
					className='rounded-circle d-block mx-auto'
				/>
				{ownProfile && (
					<button
						className='btn btn-primary d-block mt-2 mx-auto'
						onClick={() => history.push('/editprofile')}>
						Edit Profile
					</button>
				)}
				<hr />
				<h2 className='card-title text-center'>User Details</h2>
				{userData === 'Loading' ? (
					<div className='d-flex justify-content-center'>
						<div className='spinner-border mx-auto' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					</div>
				) : (
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
				)}
			</div>
		</div>
	);
};

export default withRouter(UserDetails);
