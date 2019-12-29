import React from 'react';
import { withRouter } from 'react-router-dom';

const Breadcrumbs = props => {
	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				{props.locationArray.map((loc, i) => (
					<li
						className={
							i === props.location.length - 1
								? 'breadcrumb-item active'
								: 'breadcrumb-item'
						}
						aria-current='page'
						key={loc}>
						<button
							className='btn btn-link'
							onClick={() => {
								if (i === 0) {
									props.history.replace('/forum');
									props.setCurrentCategory(null);
									props.setCurrentTopic(null);
								}
								if (i === 1) {
									props.history.replace(
										'/forum/' + props.currentCategory
									);
									props.setCurrentTopic(null);
								}
							}}>
							{loc[0].toUpperCase() + loc.slice(1)}
						</button>
					</li>
				))}
			</ol>
		</nav>
	);
};

export default withRouter(Breadcrumbs);
