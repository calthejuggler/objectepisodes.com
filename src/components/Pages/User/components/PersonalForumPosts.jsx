import React from 'react';
import { withFirebase } from '../../../Firebase/context';

const PersonalForumPosts = props => {
	const { firebase, userData } = props;
	return (
		<div className='card'>
			<div className='card-body'>
				<h2 className='card-title'>Forum Posts</h2>
			</div>
		</div>
	);
};

export default withFirebase(PersonalForumPosts);
