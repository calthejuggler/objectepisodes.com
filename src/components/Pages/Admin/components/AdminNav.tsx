import React, { FC } from 'react';

interface Props {
	setNavChoice: any;
	navChoice: string;
}

const AdminNav: FC<Props> = props => {
	const { setNavChoice, navChoice } = props;
	return (
		<ul className='list-group'>
			<li
				className={
					navChoice === 'hfotd'
						? 'list-group-item active'
						: 'list-group-item'
				}
				onClick={() => setNavChoice('hfotd')}
			>
				Historical fact of the day
			</li>
			<li
				className={
					navChoice === 'potd'
						? 'list-group-item active'
						: 'list-group-item'
				}
				onClick={() => setNavChoice('potd')}
			>
				Photo of the day
			</li>
			<li
				className={
					navChoice === 'users'
						? 'list-group-item active'
						: 'list-group-item'
				}
				onClick={() => setNavChoice('users')}
			>
				Users
			</li>
		</ul>
	);
};

export default AdminNav;
