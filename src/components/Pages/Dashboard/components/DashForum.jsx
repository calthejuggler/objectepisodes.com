import React from 'react';
import { withRouter } from 'react-router-dom';

const DashForum = props => {
	return (
		<div className='row'>
			<div className='col-12 col-md-4'>
				<div className='card'>
					<div className='card-body text-center'>
						<button
							className='btn btn-link'
							onClick={() => props.history.replace('/forum')}>
							<h4 className='card-title'>Forum</h4>
						</button>
						<p>Hottest topics right now</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(DashForum);
