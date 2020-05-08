import React, { FC, MouseEvent, useState, useEffect, useCallback } from 'react';
import Firebase from './../../../../Firebase/index';
import { withFirebase } from '../../../../Firebase/context';
import Toast from '../../../../elements/Toast';
import EditItemField from './EditItemField';

const EditItemCard: FC<{
	firebase: Firebase;
	item: {
		exists: boolean;
		data: () => firebase.firestore.DocumentData;
		id: string;
	};
	sectionTemplate: firebase.firestore.QueryDocumentSnapshot;
	adminSection: { title: string };
}> = ({ item, sectionTemplate, adminSection, firebase }) => {
	const [toastActive, setToastActive] = useState<false | string>(false);
	const [itemDataArray, setItemDataArray] = useState<string[][]>([]);

	const sortItemDataArray = useCallback(
		(itemData: firebase.firestore.DocumentData) => {
			let newArr: string[][] = [];
			Object.keys(itemData).forEach((objectKey, i) => {
				if (
					objectKey !== sectionTemplate.data()[0] &&
					objectKey !== 'added' &&
					objectKey !== 'by'
				) {
					if (
						Object.values(sectionTemplate.data()).includes(
							objectKey
						)
					) {
						newArr.unshift([objectKey, itemData[objectKey]]);
					} else {
						newArr.push([objectKey, itemData[objectKey]]);
					}
				}
			});
			return newArr;
		},
		[sectionTemplate]
	);

	useEffect(() => {
		setItemDataArray(sortItemDataArray(item.data()));
	}, [item, sortItemDataArray]);

	const handleDeleteBtnClick = (e: MouseEvent) => {
		e.preventDefault();
		setToastActive('Are you sure you want to delete this item?');
	};
	const handleDeleteConfirm = (e: MouseEvent) => {
		e.preventDefault();
		firebase.db
			.collection(adminSection.title + '-database')
			.doc(item.id)
			.delete();
		setToastActive(false);
	};
	return (
		<>
			{toastActive && (
				<Toast
					message={toastActive}
					setToastActive={setToastActive}
					cancelBtnText='No'
					nextBtnText='Yes'
					nextBtnFunc={handleDeleteConfirm}
				/>
			)}
			<div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
				<div className='card my-2'>
					<div className='card-header text-right'>
						<div className='row align-items-center'>
							<div className='col-8'>
								<h6 className='card-text text-left'>
									{item.data()[sectionTemplate.data()[0]]}
								</h6>
							</div>
							<div className='col-4 text-right'>
								<button
									className='btn btn-sm btn-danger'
									onClick={handleDeleteBtnClick}
								>
									X
								</button>
							</div>
						</div>
					</div>
					{item.exists && item.data() && item.data().photoURL && (
						<img
							src={item.data().photoURL}
							alt={
								sectionTemplate.exists &&
								sectionTemplate.data()[0] &&
								item.data()[sectionTemplate.data()[0]]
							}
							className='card-img-top'
							object-fit='cover'
						/>
					)}
					<div className='card-body'>
						{itemDataArray.map(
							(itemData, i) =>
								typeof itemData[1] !== 'object' &&
								itemData[0] !== 'photoURL' &&
								itemData[0] !== 'photoStorageRef' && (
									<EditItemField
										key={'itemField' + i}
										itemData={itemData}
									/>
								)
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default withFirebase(EditItemCard);
