import React, {
	FC,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
	useCallback,
} from 'react';
import { withFirebase } from '../../../Firebase/context';
import Firebase from './../../../Firebase/config';
import EditItemCard from './components/EditItemCard';
import SearchBar from '../../../elements/SearchBar/SearchBar';

interface Props {
	adminSection: { title: string };
	firebase: Firebase;
	setError: Dispatch<SetStateAction<string>>;
}

const EditItems: FC<Props> = ({ adminSection, firebase, setError }) => {
	const [queryData, setQueryData] = useState<
		firebase.firestore.DocumentData[]
	>();
	const [sectionTemplate, setSectionTemplate] = useState<
		firebase.firestore.DocumentData
	>();

	const [currentSearch, setCurrentSearch] = useState<string>('');
	const [displayedData, setDisplayedData] = useState<
		firebase.firestore.DocumentData[] | undefined
	>();
	useEffect(() => {
		return firebase.db
			.collection(adminSection.title + '-database')
			.orderBy('added', 'desc')
			.onSnapshot(
				(queryRes: firebase.firestore.QuerySnapshot) =>
					setQueryData(queryRes.docs),
				(err: Error) => setError(err.message)
			);
	}, [adminSection.title, firebase.db, setError]);
	useEffect(() => {
		return firebase.db
			.collection('database-templates')
			.doc(adminSection.title)
			.onSnapshot(
				(queryRes: firebase.firestore.QueryDocumentSnapshot) =>
					setSectionTemplate(queryRes.data()),
				(err: Error) => setError(err.message)
			);
	}, [adminSection.title, firebase.db, setError]);

	const searchFilter = useCallback(
		(propDataArray: firebase.firestore.DocumentData[] | undefined) => {
			if (propDataArray) {
				if (currentSearch !== '') {
					let newArr: firebase.firestore.DocumentData[] = [];
					propDataArray.forEach(
						(doc: firebase.firestore.DocumentData) => {
							let includesSearchTerm = false;
							Object.values(doc.data()).forEach(
								(value: any, i) => {
									if (
										Object.keys(doc.data())[i][0] !==
										Object.keys(doc.data())[
											i
										][0].toLowerCase()
									) {
										if (
											typeof value === 'string' &&
											value
												.toLowerCase()
												.includes(
													currentSearch.toLowerCase()
												)
										) {
											includesSearchTerm = true;
										}
									}
								}
							);
							if (includesSearchTerm) {
								newArr.push(doc.data());
							}
						}
					);
					return newArr;
				} else {
					return propDataArray.map((propData) => propData.data());
				}
			}
		},
		[currentSearch]
	);
	useEffect(() => {
		setDisplayedData(searchFilter(queryData));
	}, [queryData, searchFilter]);

	return (
		<>
			<div className='col-12'>
				<hr />
				<h4 className='text-center'>
					Edit{' '}
					{adminSection.title[0].toUpperCase() +
						adminSection.title.slice(1)}
				</h4>
			</div>
			<div className='col-12 mx-auto my-2'>
				<SearchBar
					currentSearch={currentSearch}
					setCurrentSearch={setCurrentSearch}
				/>
			</div>
			<div className='col-12 col-md-10 mx-auto'>
				<div className='row'>
					{displayedData &&
						displayedData.length !== 0 &&
						sectionTemplate &&
						displayedData.map((item, i) =>
							queryData ? (
								queryData[i] ? (
									<EditItemCard
										item={item}
										itemID={queryData[i].id}
										sectionTemplate={sectionTemplate}
										adminSection={adminSection}
										key={item[sectionTemplate[0]]}
									/>
								) : null
							) : null
						)}
				</div>
			</div>
		</>
	);
};

export default withFirebase(EditItems);
