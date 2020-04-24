import React, { useEffect, FC, useState } from 'react';
import { withFirebase } from '../../../Firebase/context';
import Firebase from './../../../Firebase/config';

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
						<div
							className='col-6 col-md-4 col-lg-3'
							key={'dataCard' + i}
						>
							<div className='card'>
								<div className='card-body'>
									{Object.keys(propData).map(
										(field, i) =>
											isNaN(Number.parseInt(field[0])) &&
											field[0] ===
												field[0].toUpperCase() && (
												<div
													className='row'
													key={'dataField' + i}
												>
													{field}:{' '}
													{typeof Object.values(
														propData
													)[i] === 'string' &&
														Object.values(propData)[
															i
														]}
												</div>
											)
									)}
								</div>
							</div>
							{propData.title}
						</div>
					)
				)}
		</div>
	);
};

export default withFirebase(PropsDatabase);
