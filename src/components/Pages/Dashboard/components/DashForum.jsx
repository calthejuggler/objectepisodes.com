import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {withFirebase} from '../../../Firebase/context'

const DashForum = props => {
	const {history,firebase} = props
	return (
		<div className='row'>
			<div className='col-12 col-md-4'>
				<div className='card'>
					<div className='card-body text-center'>
						<button
							className='btn btn-link'
							onClick={() => history.replace('/forum')}>
							<h4 className='card-title'>Forum</h4>
						</button>
						<p>Most liked topics</p>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<div className="row">
									<div className="col-3"><b>Title</b></div>
									<div className="col-3"><b>User</b></div>
									<div className="col-3"><b>Date</b></div>
									<div className="col-3"><b>Likes</b></div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withFirebase(withRouter(DashForum));
