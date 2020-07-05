import React, { FC } from 'react';
import GoldenClubsButton from './modals/GoldenClubsButton';
import GiveBadgeButton from './modals/GiveBadgeButton';

const UserTools: FC<{
	selectedUser: { id: string; data: firebase.firestore.DocumentData } | null;
}> = ({ selectedUser }) => {
	return (
		<ul className='list-group list-group-flush'>
			<li className='list-group-item'>
				<GoldenClubsButton selectedUser={selectedUser} />
				<GiveBadgeButton selectedUser={selectedUser} />
			</li>
		</ul>
	);
};

export default UserTools;
