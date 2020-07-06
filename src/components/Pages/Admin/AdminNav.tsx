import React, { FC, Dispatch, SetStateAction } from 'react';
import { withAuth } from '../../Session';
import { UserContextInterface } from '../../Session/context';

interface Props {
	navChoice: string;
	editTemplate: boolean;
	setNavChoice: Dispatch<SetStateAction<string>>;
	setEditTemplate: Dispatch<SetStateAction<boolean>>;
	adminSections: Array<{ title: string }>;
	user: UserContextInterface;
}

const AdminNav: FC<Props> = (props) => {
	const {
		setNavChoice,
		navChoice,
		editTemplate,
		setEditTemplate,
		adminSections,
		user,
	} = props;
	return (
		<ul className='list-group'>
			{adminSections.map((section) => {
				if (
					section.title === 'users' &&
					user?.auth?.email !== 'calthejuggler@gmail.com'
				) {
					return (
						<li
							key={section.title}
							className={'list-group-item disabled'}
						>
							{section.title.slice(0, 1).toUpperCase() +
								section.title.slice(1)}{' '}
							<small className='float-right'>
								Webmaster Only
							</small>
						</li>
					);
				}
				return (
					<li
						key={section.title}
						className={
							navChoice === section.title
								? 'list-group-item active'
								: 'list-group-item'
						}
						onClick={() => setNavChoice(section.title)}
					>
						{section.title.slice(0, 1).toUpperCase() +
							section.title.slice(1)}
						{section.title !== 'users' && (
							<span
								className={
									editTemplate
										? 'btn badge badge-danger badge-pill float-right'
										: 'btn badge badge-secondary badge-pill float-right'
								}
								onClick={() => setEditTemplate((prev) => !prev)}
							>
								Edit Template
							</span>
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default withAuth(AdminNav);
