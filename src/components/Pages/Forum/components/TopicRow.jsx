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
						props.history.push(
							'/forum/' + currentCategory + '/' + id
						);
						setLocation(prev => [
							...prev,
							title + ' (' + username + ')',
						]);
						setCurrentTopic(id);
					}}>
					{title}
				</button>
			</td>
			<td>{username}</td>
			<td>{posted}</td>
			<td>{lastPost}</td>
		</tr>
	);
};

export default withRouter(TopicRow);
