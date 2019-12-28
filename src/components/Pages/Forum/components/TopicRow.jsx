import React from 'react';
import { withRouter } from 'react-router-dom';

const TopicRow = props => {
	const { id, title, username, posted, lastPost, currentCategory, setCurrentTopic } = props;
	return (
		<tr>
			<td>
				<button
					className='btn btn-link'
					onClick={() => {
						props.history.push('/forum/' + currentCategory + "/" + id);
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
