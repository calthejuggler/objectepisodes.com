import React, {
	useState,
	ChangeEvent,
	MouseEvent,
	FC,
	useEffect,
	useCallback,
} from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import Firebase from './../../../../../Firebase/config';
import { withAuth } from './../../../../../Session/withAuth';
import PropPhotoUpload from './PropPhotoUpload';
import PropUploadAlerts from './PropUploadAlerts';
import PropTemplateFields from './PropTemplateFields';
import PropExtraFields from './PropExtraFields';
import AddPropButtons from './AddPropButtons';

const AddProp: FC<{
	editTemplate: boolean;
	firebase: Firebase;
	user: { displayName: string };
}> = ({ editTemplate, firebase, user }) => {
	const [templateFields, setTemplateFields] = useState<Array<Array<string>>>(
		[]
	);
	const [fields, setFields] = useState<Array<Array<string>>>([['', '']]);

	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const updateFieldChanged = (
		parentI: number,
		childI: number,
		template: boolean
	) => (e: ChangeEvent<HTMLInputElement>) => {
		if (!template) {
			let newArr = [...fields];
			newArr[parentI][childI] = e.target.value;
			setFields(newArr);
		} else {
			let newArr = [...templateFields];
			newArr[parentI][childI] = e.target.value;
			setTemplateFields(newArr);
		}
	};

	const handlePhotoUpload = async (e?: MouseEvent): Promise<void> => {
		e && e.preventDefault();
		if (photo) {
			setPhoto({ file: photo.file, uploaded: true });
			const storageRef = firebase.storage
				.ref()
				.child('prop-images/' + photo.file.name);
			await storageRef
				.put(photo.file)
				.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
					setUploadState(snapshot.state);
					snapshot.ref
						.getDownloadURL()
						.then((url) => setPhotoURL(url));
				})
				.catch((e: Error) => setError(e.message));
		}
	};

	const [uploadState, setUploadState] = useState<string | null>(null);
	const [photoURL, setPhotoURL] = useState<string | null>(null);

	const resetFields = useCallback(() => {
		firebase.db
			.collection('database-templates')
			.doc('props')
			.get()
			.then((res: firebase.firestore.DocumentData) => {
				if (res.data().noOfFields > 0) {
					let newTemplateFieldsWithNum: Array<string> = Object.values(
						res.data()
					);
					let newTemplateFields: Array<Array<
						string
					>> = newTemplateFieldsWithNum
						.slice(0, newTemplateFieldsWithNum.length - 1)
						.map((field) => [field, '']);
					setTemplateFields(newTemplateFields);
				}
			})
			.catch((e: ErrorEvent) => setError(e.message));
		setFields([]);
		setPhoto(null);
	}, [firebase.db]);

	useEffect(() => {
		resetFields();
	}, [resetFields]);

	const [photo, setPhoto] = useState<{
		file: File;
		uploaded: boolean;
	} | null>(null);

	return (
		<div className='col-12 col-md-9'>
			<PropUploadAlerts
				editTemplate={editTemplate}
				error={error}
				success={success}
			/>
			<form>
				<PropPhotoUpload
					photo={photo}
					setPhoto={setPhoto}
					firebase={firebase}
					setError={setError}
					handlePhotoUpload={handlePhotoUpload}
					photoURL={photoURL}
					uploadState={uploadState}
				/>
				<PropTemplateFields
					templateFields={templateFields}
					setTemplateFields={setTemplateFields}
					updateFieldChanged={updateFieldChanged}
				/>
				<PropExtraFields
					fields={fields}
					setFields={setFields}
					updateFieldChanged={updateFieldChanged}
				/>
				<AddPropButtons
					resetFields={resetFields}
					setFields={setFields}
					setSuccess={setSuccess}
					setError={setError}
					templateFields={templateFields}
					fields={fields}
					firebase={firebase}
					user={user}
					photo={photo}
					handlePhotoUpload={handlePhotoUpload}
				/>
			</form>
		</div>
	);
};

export default withAuth(withFirebase(AddProp));
