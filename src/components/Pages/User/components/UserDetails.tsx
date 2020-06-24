import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Spinner from '../../../elements/Spinner';

interface Props extends RouteComponentProps {
	userData: firebase.firestore.DocumentSnapshot | null;
	ownProfile: boolean;
}

const UserDetails: FC<Props> = (props) => {
	const { userData, ownProfile, history } = props;
	return (
		<div className='card'>
			<div className='card-body'>
				{userData ? (
					<img
						src={userData.data()?.photoURL}
						alt="User's profile"
						className='rounded-circle d-block m-auto'
						style={{
							width: '150px',
							height: '150px',
							objectFit: 'cover',
						}}
					/>
				) : (
					<img
						src='https://via.placeholder.com/150x150'
						alt='Profile pic placeholder'
						className='rounded-circle d-block mx-auto'
					/>
				)}
				{ownProfile && (
					<button
						className='btn btn-primary d-block mt-2 mx-auto'
						onClick={() => history.push('/editprofile')}
					>
						Edit Profile
					</button>
				)}
				<hr />
				<h2 className='card-title text-center'>User Details</h2>
				{userData === null ? (
					<Spinner />
				) : (
					<>
						<ul className='list-unstyled'>
							<li>
								Name:{' '}
								<b>
									{userData.data()?.firstname +
										' ' +
										userData.data()?.lastname}
								</b>
							</li>
							<li>
								Username: <b>{userData.data()?.username}</b>
							</li>
							<li>
								Account Created:{' '}
								<b>
									{userData
										.data()
										?.created.toDate()
										.toDateString()}
								</b>
							</li>
							<li>
								Forum Posts:{' '}
								<b>{userData.data()?.forumPosts}</b>
							</li>
						</ul>
						<hr />
						<div className='text-center'>
							You have{' '}
							<b>
								{userData.data()?.goldenClubs
									? userData.data()?.goldenClubs.length
									: 0}
							</b>{' '}
							Golden Juggling Clubs
							{userData.data()?.goldenClubs &&
								userData.data()?.goldenClubs.length !== 0 && (
									<button
										className='btn btn-danger'
										onClick={() => {
											history.replace('/goldenclubs');
										}}
									>
										Pass Golden Clubs
									</button>
								)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default withRouter(UserDetails);
