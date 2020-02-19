import React from 'react';

const PersonalForumPostsRow = props => {
	const { topicData, category } = props;
	return (
		<li className='list-group-item'>
			<div className='row'>
				<div className='col-4'>
					<a href={'#/forum/' + category + '/' + topicData.id}>
						{topicData.data().title}
					</a>
				</div>
				<div className='col-4'>
					{topicData
						.data()
						.posted.toDate()
						.toUTCString()}
				</div>
				<div className='col-4'>
					{topicData
						.data()
						.lastPost.toDate()
						.toUTCString()}
				</div>
			</div>
		</li>
	);
};

export default PersonalForumPostsRow;
