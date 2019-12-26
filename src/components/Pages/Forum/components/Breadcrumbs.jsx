import React from 'react';

export const Breadcrumbs = props => {
	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				{props.location.map((loc, i) => (
					<li
						className={
							i === props.location.length - 1
								? 'breadcrumb-item active'
								: 'breadcrumb-item'
						}
						aria-current='page'
						key={loc}>
						{loc[0].toUpperCase() + loc.slice(1)}
					</li>
				))}
			</ol>
		</nav>
	);
};
