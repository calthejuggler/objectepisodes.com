import React from 'react';
import { withRouter } from 'react-router-dom';

const TopicRow = props => {
	const {
		id,
		title,
		username,
		posted,
		lastPost,
		currentCategory,
		setCurrentTopic,
		setLocation,
		photoURL,
	} = props;
	return (
		<li className='list-group-item'>
			<div className='row align-items-center'>
				<div className='col-6 col-sm-3'>
					<button
						className='btn btn-link'
						onClick={() => {
							setCurrentTopic(id);
							props.history.replace(
								'/forum/' + currentCategory + '/' + id
							);
							setLocation(prev => [...prev, id]);
						}}>
						<a href={'#/forum/' + currentCategory + '/' + id}>
							{title}
						</a>
					</button>
				</div>
				<div className='col-6 col-sm-3'>
					<a
						href={'#/user/' + username}
						className='row align-items-center justify-content-center'>
						<img
							className='rounded-circle'
							style={{
								objectFit: 'cover',
								width: '40px',
								height: '40px',
								margin: '0.15rem'
							}}
							src={photoURL}
							alt='Topic poster profile'
						/>
						{username}
					</a>
				</div>
				<div className='col-3 d-none d-sm-block'>
					<p>
						{posted.toDateString() === new Date().toDateString()
							? 'Today - ' + posted.toTimeString()
							: posted.toUTCString()}
					</p>
				</div>
				<div className='col-3 d-none d-sm-block'>
					<p>
						{lastPost.toDateString() === new Date().toDateString()
							? 'Today - ' + lastPost.toTimeString()
							: lastPost.toUTCString()}
					</p>
				</div>
			</div>
		</li>
	);
};

export default withRouter(TopicRow);
