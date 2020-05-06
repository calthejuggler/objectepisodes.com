import React, {
	useEffect,
	FC,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';
import { withFirebase } from '../../../Firebase/context';
import Firebase from '../../../Firebase/config';
import ItemCard from './ItemCard';
import BackButton from './BackButton';
import routes from '../../../../routes';

const CategoryViewer: FC<{
	firebase: Firebase;
	currentView: string;
	setCurrentView: Dispatch<SetStateAction<string>>;
}> = ({ firebase, currentView, setCurrentView }) => {
	const [dataArray, setDataArray] = useState<
		firebase.firestore.DocumentData[]
	>([]);
	useEffect(() => {
		if (currentView !== 'database') {
			firebase.db
				.collection(currentView + '-database')
				.get()
				.then((queryRes: firebase.firestore.QuerySnapshot) => {
					let newArr: firebase.firestore.DocumentData[] = [];
					queryRes.docs.forEach((doc) => {
						newArr.push(doc.data());
					});
					setDataArray(newArr);
				});
		} else {
			let newArr: firebase.firestore.DocumentData[] = [];
			routes.database.forEach((route) => {
				newArr.push(route);
			});
			setDataArray(newArr)
		}
	}, [firebase.db, currentView]);
	return (
		<div className='row align-items-center justify-content-around h-100 mb-3'>
			<div className="col-12">
				<BackButton
					currentView={currentView}
					setCurrentView={setCurrentView}
				/>
			</div>
			{dataArray &&
				dataArray.map(
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
