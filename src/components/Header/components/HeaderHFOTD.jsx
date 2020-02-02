import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../Firebase/context';

const HeaderHFOTD = props => {
	const { firebase } = props;

	const [hfotd, setHfotd] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		firebase.db
			.collection('hfotd')
			.where('shown', '==', false)
			.orderBy('timestamp', 'asc')
			.limit(1)
			.get()
			.then(docsSnap => {
				setHfotd(docsSnap.docs[0].data());
			})
			.catch(e => {
				setError(e.message);
			});
	}, [firebase.db]);
	return (
		<div className='card h-100 text-center'>
			<div className='card-body'>
				<h4 className='card-title'>Historical Fact of the Day</h4>
				{error && <p className='text-danger'>{error}</p>}
				<p className='card-text'>
					{!hfotd ? 'Loading...' : hfotd.fact}
				</p>
			</div>
		</div>
	);
};

export default withFirebase(HeaderHFOTD);
