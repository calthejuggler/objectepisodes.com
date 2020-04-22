import React, { FC } from 'react';

interface Props {
	setNavChoice: any;
	navChoice: string;
}

const AdminNav: FC<Props> = (props) => {
	const { setNavChoice, navChoice } = props;
	return (
		<ul className='list-group'>
			<li
				className={
					navChoice === 'photos'
						? 'list-group-item active'
						: 'list-group-item'
				}
				onClick={() => setNavChoice('photos')}
			>
				Photos
			</li>
			<li
				className={
					navChoice === 'props'
						? 'list-group-item active'
						: 'list-group-item'
				}
				onClick={() => setNavChoice('props')}
			>
				Props
			</li>
			<li
				className={
					navChoice === 'literature'
						? 'list-group-item active'
						: 'list-group-item'
				}
				onClick={() => setNavChoice('literature')}
			>
				Literature
			</li>
			<li
				className={
					navChoice === 'tricks'
						? 'list-group-item active'
						: 'list-group-item'
				}
				onClick={() => setNavChoice('tricks')}
			>
				Tricks
			</li>
			<li
				className={
					navChoice === 'bios'
						? 'list-group-item active'
						: 'list-group-item'
				}
				onClick={() => setNavChoice('bios')}
			>
				Biographies
			</li>
		</ul>
	);
};

export default AdminNav;
