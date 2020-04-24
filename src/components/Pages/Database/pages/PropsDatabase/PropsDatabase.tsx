import React, { useEffect, FC, useState } from 'react';
import { withFirebase } from '../../../../Firebase/context';
import Firebase from '../../../../Firebase/config';
import PropCard from './components/PropCard';

const PropsDatabase: FC<{ firebase: Firebase }> = ({ firebase }) => {
	const [propsDataArray, setPropsDataArray] = useState<
		firebase.firestore.DocumentData[] | null
	>(null);

	useEffect(() => {
		firebase.db
			.collection('props-database')
			.get()
			.then((queryRes: firebase.firestore.QuerySnapshot) => {
				let newArr: firebase.firestore.DocumentData[] = [];
				queryRes.docs.forEach((doc) => {
					newArr.push(doc.data());
				});
				setPropsDataArray(newArr);
			});
	}, [firebase.db]);

	return (
		<div className='row align-items-center justify-content-around h-100 mb-3'>
			{propsDataArray &&
				propsDataArray.map(
					(propData: firebase.firestore.DocumentData, i) => (
						<PropCard propData={propData} i={i} />
					)
				)}
		</div>
	);
};

export default withFirebase(PropsDatabase);
