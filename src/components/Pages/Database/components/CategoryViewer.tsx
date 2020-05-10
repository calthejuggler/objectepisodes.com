import React, {
	useEffect,
	FC,
	useState,
	Dispatch,
	SetStateAction,
	useCallback,
} from 'react';
import { withFirebase } from '../../../Firebase/context';
import Firebase from '../../../Firebase/config';
import ItemCard from './ItemCard';
import BackButton from './BackButton';
import SearchBar from './../../../elements/SearchBar/SearchBar';
import routes from '../../../../routes';

const CategoryViewer: FC<{
	firebase: Firebase;
	currentView: string;
	setCurrentView: Dispatch<SetStateAction<string>>;
}> = ({ firebase, currentView, setCurrentView }) => {
	const [dataArray, setDataArray] = useState<
		firebase.firestore.DocumentData[]
	>([]);
	const [displayedData, setDisplayedData] = useState<
		firebase.firestore.DocumentData[]
	>([]);
	const [currentSearch, setCurrentSearch] = useState<string>('');

	const createDataArray = (queryRes: firebase.firestore.QuerySnapshot) => {
		let newArr: firebase.firestore.DocumentData[] = [];
		queryRes.docs.forEach((doc) => {
			newArr.push(doc.data());
		});
		return newArr;
	};

	const searchFilter = useCallback(
		(propDataArray) => {
			if (currentSearch !== '') {
				let newArr: firebase.firestore.DocumentData[] = [];
				propDataArray.forEach(
					(docData: firebase.firestore.DocumentData) => {
						let includesSearchTerm = false;
						Object.values(docData).forEach((value: any) => {
							if (
								typeof value === 'string' &&
								value
									.toLowerCase()
									.includes(currentSearch.toLowerCase())
							) {
								includesSearchTerm = true;
							}
						});
						if (includesSearchTerm) {
							newArr.push(docData);
						}
					}
				);
				return newArr;
			} else {
				return propDataArray;
			}
		},
		[currentSearch]
	);

	useEffect(() => {
		if (currentView !== 'database') {
			firebase.db
				.collection(currentView + '-database')
				.orderBy('added', 'desc')
				.get()
				.then((res: firebase.firestore.QuerySnapshot) => {
					const resultAsDataArray = createDataArray(res);
					setDataArray(resultAsDataArray);
				});
		} else {
			let newArr: firebase.firestore.DocumentData[] = [];
			routes.database.forEach((route) => {
				newArr.push(route);
			});
			setDataArray(newArr);
		}
	}, [currentView, firebase.db]);

	useEffect(() => {
		setDisplayedData(searchFilter(dataArray));
	}, [dataArray, searchFilter]);

	return (
		<div className='row align-items-center justify-content-around h-100 mb-3'>
			<div className={currentView === 'database' ? 'col-12' : 'col-3'}>
				<BackButton
					currentView={currentView}
					setCurrentView={setCurrentView}
				/>
			</div>
			{currentView !== 'database' && (
				<div className='col-9'>
					<SearchBar
						currentSearch={currentSearch}
						setCurrentSearch={setCurrentSearch}
						setDataArray={setDataArray}
					/>
				</div>
			)}
			{displayedData.map(
				(propData: firebase.firestore.DocumentData, i) => (
					<ItemCard
						propData={propData}
						i={i}
						currentView={currentView}
						setCurrentView={setCurrentView}
						key={'dataCard' + i}
					/>
				)
			)}
		</div>
	);
};

export default withFirebase(CategoryViewer);
