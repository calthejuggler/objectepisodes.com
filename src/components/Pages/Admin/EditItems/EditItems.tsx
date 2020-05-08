import React, {
	FC,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';
import { withFirebase } from '../../../Firebase/context';
import Firebase from './../../../Firebase/config';
import EditItemCard from './components/EditItemCard';

interface Props {
	adminSection: { title: string };
	firebase: Firebase;
	setError: Dispatch<SetStateAction<string>>;
}

const EditItems: FC<Props> = ({ adminSection, firebase, setError }) => {
	const [queryData, setQueryData] = useState<
		firebase.firestore.QuerySnapshot
	>();
	const [sectionTemplate, setSectionTemplate] = useState<
		firebase.firestore.QueryDocumentSnapshot
	>();
	useEffect(() => {
		return firebase.db
			.collection(adminSection.title + '-database')
			.orderBy('added', 'desc')
			.onSnapshot(
				(queryRes: firebase.firestore.QuerySnapshot) =>
					setQueryData(queryRes),
				(err: Error) => setError(err.message)
			);
	}, [adminSection.title, firebase.db, setError]);
	useEffect(() => {
		return firebase.db
			.collection('database-templates')
			.doc(adminSection.title)
			.onSnapshot(
				(queryRes: firebase.firestore.QueryDocumentSnapshot) =>
					setSectionTemplate(queryRes),
				(err: Error) => setError(err.message)
			);
	}, [adminSection.title, firebase.db, setError]);

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
			<div className='col-12'>
				<div className='row'>
					{queryData &&
						!queryData.empty &&
						sectionTemplate &&
						queryData.docs.map((item) => (
							<EditItemCard
								item={item}
								sectionTemplate={sectionTemplate}
								adminSection={adminSection}
								key={item.id}
							/>
						))}
				</div>
			</div>
		</>
	);
};

export default withFirebase(EditItems);
