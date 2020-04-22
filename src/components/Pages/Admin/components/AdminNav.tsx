import React, { FC, Dispatch, SetStateAction } from 'react';

interface Props {
	navChoice: string;
	editTemplate: boolean;
	setNavChoice: Dispatch<SetStateAction<string>>;
	setEditTemplate: Dispatch<SetStateAction<boolean>>;
}

const AdminNav: FC<Props> = (props) => {
	const { setNavChoice, navChoice, editTemplate, setEditTemplate } = props;
	const areas = ['photos', 'props', 'literature', 'tricks', 'biographies'];
	return (
		<ul className='list-group'>
			{areas.map((area) => (
				<li
					key={area}
					className={
						navChoice === area
							? 'list-group-item active'
							: 'list-group-item'
					}
					onClick={() => setNavChoice(area)}
				>
					{area.slice(0, 1).toUpperCase() + area.slice(1)}
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
				</li>
			))}
		</ul>
	);
};

export default AdminNav;
