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
		<tr>
			<td>
				<button
					className='btn btn-link'
					onClick={() => {
						setCurrentTopic(id);
						props.history.replace(
							'/forum/' + currentCategory + '/' + id
						);
						setLocation(prev => [...prev, id]);
					}}>
					{title}
				</button>
			</td>
			<td>{username}</td>
			<td>{posted.toDateString() === new Date().toDateString() ? "Today - "+posted.toTimeString():posted.toUTCString()}</td>
			<td>{lastPost.toDateString() === new Date().toDateString() ? "Today - "+lastPost.toTimeString():lastPost.toUTCString()}</td>
		</tr>
	);
};

export default withRouter(TopicRow);
