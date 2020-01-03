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
	} = props;
	return (
		<li className='list-group-item'>
			<div className='row'>
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
						<a href={"#/forum/"+currentCategory+"/"+id}>{title}</a>
					</button>
				</div>
				<div className='col-6 col-sm-3'>
					<p>{username}</p>
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
