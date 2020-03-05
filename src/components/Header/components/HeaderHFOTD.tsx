import React, { useEffect, useState, FC } from 'react';
import { withFirebase } from '../../Firebase/context';
import Firebase from './../../Firebase/config';

const HeaderHFOTD: FC<{ firebase: Firebase }> = props => {
	const { firebase } = props;

	const [hfotd, setHfotd] = useState<null | { fact: string }>(null);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		firebase.db
			.collection('hfotd')
			.orderBy('timestamp', 'asc')
			.limit(2)
			.get()
			.then((docsSnap: any) => {
				if (docsSnap.empty) {
					setError("There were no HFsOTD in the database :'(");
					setHfotd({ fact: 'ERROR:' });
				} else {
					if (!docsSnap.docs[0].data().shown) {
						firebase.db
							.collection('hfotd')
							.doc(docsSnap.docs[0].id)
							.update({
								shown: firebase.dbFunc.FieldValue.serverTimestamp()
							})
							.then(() => setHfotd(docsSnap.docs[0].data()))
							.catch((e: { message: string }) =>
								setError(e.message)
							);
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
							.then(() => {
								firebase.db
									.collection('hfotd')
									.doc(docsSnap.docs[0].id)
									.delete()
									.then(() => {
										setHfotd(docsSnap.docs[1].data());
									});
							})
							.catch((e: { message: string }) =>
								setError(e.message)
							);
					} else {
						setHfotd(docsSnap.docs[0].data());
					}
				}
			})
			.catch((e: { message: string }) => {
				setError(e.message);
			});
	}, [firebase.db, firebase.dbFunc.FieldValue]);
	return (
		<div className='text-center'>
			<h4>Historical Fact of the Day</h4>
			{error && <p className='text-danger'>{error}</p>}
			{!hfotd ? (
				<div className='spinner-border' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<p className='card-text'>{hfotd.fact}</p>
			)}
		</div>
	);
};

export default withFirebase(HeaderHFOTD);
