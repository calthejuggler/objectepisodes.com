import React, {
	useState,
	FC,
	useCallback,
	useEffect,
	ReactFragment,
} from 'react';
import BackButton from './components/BackButton';
import SearchBar from '../../elements/SearchBar/SearchBar';
import ItemCard from './components/ItemCard';
import { withFirebase } from '../../Firebase/context';
import Firebase from './../../Firebase/config';
import routes from '../../../routes';
import ItemCardField from './components/ItemCardField';

const Database: FC<{ firebase: Firebase }> = ({ firebase }) => {
	const [currentView, setCurrentView] = useState<string>('database');
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
						Object.values(docData).forEach((value: any, i) => {
							if (
								Object.keys(docData)[i][0] !==
								Object.keys(docData)[i][0].toLowerCase()
							) {
								if (
									typeof value === 'string' &&
									value
										.toLowerCase()
										.includes(currentSearch.toLowerCase())
								) {
									includesSearchTerm = true;
								}
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

	const checkStringForSearch = (string: string): ReactFragment => {
		if (string) {
			const searchString = string
				.toLowerCase()
				.indexOf(currentSearch.toLowerCase());
			if (currentSearch === '') return string;
			if (searchString === -1) return string;

			const splitString = string.split(currentSearch);
			let stringBuild: { bold: boolean; text: string }[] = [];

			splitString.forEach((section, i) => {
				if (i === 0) {
					if (searchString === 0) {
						stringBuild.push({
							text: currentSearch.toUpperCase(),
							bold: true,
						});
						stringBuild.push({
							text: section.slice(currentSearch.length),
							bold: false,
						});
					} else {
						stringBuild.push({
							text: section,
							bold: false,
						});
						stringBuild.push({
							text: currentSearch.toUpperCase(),
							bold: true,
						});
					}
				} else if (i === splitString.length - 1) {
					if (
						string
							.slice(
								currentSearch.length -
									(currentSearch.length - 1)
							)
							.toLowerCase() === currentSearch.toLowerCase()
					) {
						stringBuild.push({
							text: section,
							bold: false,
						});
						stringBuild.push({
							text: currentSearch.toUpperCase(),
							bold: true,
						});
					} else {
						stringBuild.push({
							text: section,
							bold: false,
						});
					}
				} else {
					stringBuild.push({
						text: section,
						bold: false,
					});
					stringBuild.push({
						text: currentSearch.toUpperCase(),
						bold: true,
					});
				}
				return <></>;
			});
			return stringBuild.map((section) =>
				section.bold ? <b>{section.text}</b> : <>{section.text}</>
			);
		} else return <></>;
	};

	return (
		<>
			<div className='row align-items-center justify-content-around h-100 mb-3'>
				<div
					className={currentView === 'database' ? 'col-12' : 'col-3'}
				>
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
						/>
					</div>
				)}
				{displayedData.map(
					(propData: firebase.firestore.DocumentData, i: number) => (
						<ItemCard
							checkStringForSearch={checkStringForSearch}
							propData={propData}
							currentView={currentView}
							setCurrentView={setCurrentView}
							currentSearch={currentSearch}
							key={'dataCard' + i}
						>
							{Object.keys(propData).map(
								(field, i) =>
									field !== 'Title' &&
									field !== 'Description' &&
									isNaN(Number.parseInt(field[0])) &&
									field[0] === field[0].toUpperCase() && (
										<ItemCardField
											key={'dataField' + i}
											checkStringForSearch={
												checkStringForSearch
											}
											field={field}
											propData={propData}
											i={i}
										/>
									)
							)}
						</ItemCard>
					)
				)}
			</div>
		</>
	);
};

export default withFirebase(Database);
