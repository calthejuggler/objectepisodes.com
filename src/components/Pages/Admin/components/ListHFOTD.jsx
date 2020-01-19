import React, { useLayoutEffect, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';

const ListHFOTD = props => {
	const { firebase } = props;
	const [facts, setFacts] = useState([]);
	useLayoutEffect(() => {
		return firebase.db
			.collection('hfotd')
			.orderBy('timestamp', 'desc')
			.onSnapshot(hfotdsSnap => {
				setFacts([]);
				hfotdsSnap.forEach(hfotd => {
					firebase.db
						.collection('users')
						.doc(hfotd.data().user)
						.get()
						.then(userDoc => {
							setFacts(prev => [
								...prev,
								{ factData: hfotd, user: userDoc },
							]);
						});
				});
			});
	}, [firebase.db]);
	return (
		<ul className='list-group list-group-flush'>
			<li className='list-group-item'>
				<div className='row text-center'>
					<div className='col-5'>
						<b>Historical Fact</b>
					</div>
					<div className='col-4'>
						<b>Posted By</b>
					</div>
					<div className='col-3'>
						<b>Shown?</b>
					</div>
				</div>
			</li>
			{facts.length > 0
				? facts.map(fact => (
						<li className='list-group-item' key={fact.factData.id}>
							<div className='row text-center'>
								<div className='col-5'>
									{fact.factData.data().fact}
								</div>
								<div className='col-4'>
									<a href={'#/users/' + fact.user.id}>
										{fact.user.data().username}
									</a>
								</div>
								<div className='col-3'>
									{fact.factData.data().shown ? 'Yes' : 'No'}
								</div>
							</div>
						</li>
				  ))
				: null}
		</ul>
	);
};

export default withFirebase(ListHFOTD);
