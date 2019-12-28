import React from 'react';

export const TopicRow = props => {
	const { title, username, posted, lastPost } = props;
	return (
		<tr>
			<td>{title}</td>
			<td>{username}</td>
			<td>{posted}</td>
			<td>{lastPost}</td>
		</tr>
	);
};
