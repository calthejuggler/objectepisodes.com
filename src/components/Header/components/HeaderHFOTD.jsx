import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../Firebase/context';

const HeaderHFOTD = props => {
	const { firebase } = props;

	const [hfotd, setHfotd] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		firebase.db
			.collection('hfotd')
			.where('toBeShown', '>=', new Date().setTime(0).valueOf())
			.where(
				'toBeShown',
				'<=',
				new Date().setDate(new Date().getDate() + 1).valueOf()
			)
			.orderBy('toBeShown', 'asc')
			.limit(1)
			.get()
			.then(docsSnap => {
				if (docsSnap.empty) {
					setError(
						'There was an issue retrieving a HFOTD for today!'
					);
					setHfotd("ERROR:")
				} else {
					setHfotd(docsSnap.docs[0].data());
				}
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
					{!hfotd ? (
						<div class='spinner-border' role='status'>
							<span class='sr-only'>Loading...</span>
						</div>
					) : (
						hfotd.fact
					)}
				</p>
			</div>
		</div>
	);
};

export default withFirebase(HeaderHFOTD);
