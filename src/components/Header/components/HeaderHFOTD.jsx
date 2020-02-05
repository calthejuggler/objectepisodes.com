import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../Firebase/context';

const HeaderHFOTD = props => {
	const { firebase } = props;

	const [hfotd, setHfotd] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		firebase.db
			.collection('hfotd')
			.orderBy('timestamp', 'asc')
			.limit(2)
			.get()
			.then(docsSnap => {
				if (docsSnap.empty) {
					setError("There were no HFOTD in the database :'(");
					setHfotd('ERROR:');
				} else {
					if (!docsSnap.docs[0].data().shown) {
						firebase.db
							.collection('hfotd')
							.doc(docsSnap.docs[0].id)
							.update({
								shown: firebase.dbFunc.FieldValue.serverTimestamp(),
							})
							.then(res => setHfotd(docsSnap.docs[0].data()))
							.catch(e => setError(e.message));
					} else if (
						docsSnap.docs[0]
							.data()
							.shown.toDate()
							.getDate() < new Date().getDate() ||
						(docsSnap.docs[0]
							.data()
							.shown.toDate()
							.getDate() !== 0 &&
							new Date().getDate() === 0)
					) {
						firebase.db
							.collection('hfotd-archive')
							.doc(docsSnap.docs[0].id)
							.set(docsSnap.docs[0].data())
							.then(res => {
								firebase.db
									.collection('hfotd')
									.doc(docsSnap.docs[0].id)
									.delete()
									.then(() => {
										setHfotd(docsSnap.docs[1].data());
									});
							})
							.catch(e => setError(e.message));
					} else {
						setHfotd(docsSnap.docs[0].data());
					}
				}
			})
			.catch(e => {
				setError(e.message);
			});
	}, [firebase.db, firebase.dbFunc.FieldValue]);
	return (
		<div className='card h-100 text-center'>
			<div className='card-body'>
				<h4 className='card-title'>Historical Fact of the Day</h4>
				{error && <p className='text-danger'>{error}</p>}
				{!hfotd ? (
					<div className='spinner-border' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				) : (
					<p className='card-text'>{hfotd.fact}</p>
				)}
			</div>
		</div>
	);
};

export default withFirebase(HeaderHFOTD);
