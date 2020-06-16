import React, {
	useState,
	ChangeEvent,
	MouseEvent,
	FC,
	Dispatch,
	SetStateAction,
} from 'react';
import { withFirebase } from '../../../Firebase/context';
import Firebase from '../../../Firebase/config';
import { withAuth } from '../../../Session/withAuth';
import AddPhotoUpload from './components/AddPhotoUpload';
import AddAlerts from './components/AddAlerts';
import TemplateFields from './components/TemplateFields';
import ExtraFields from './components/ExtraFields';
import AddButtons from './components/AddButtons';

const AddItem: FC<{
	editTemplate: boolean;
	firebase: Firebase;
	user: { uid: string };
	fields: string[][];
	setFields: Dispatch<SetStateAction<string[][]>>;
	templateFields: string[][];
	setTemplateFields: Dispatch<SetStateAction<string[][]>>;
	updateFieldChanged: (
		parentI: number,
		childI: number,
		template: boolean
	) => (e: ChangeEvent<HTMLInputElement>) => void;
	error: string | null;
	setError: Dispatch<SetStateAction<string | null>>;
	resetFields: () => void;
	photo: { file: File; uploaded: boolean } | null;
	setPhoto: Dispatch<
		SetStateAction<{ file: File; uploaded: boolean } | null>
	>;
	adminSection: {
		photo: boolean;
		editingNoun: string;
		title: string;
		photoRequired: boolean;
	};
}> = ({
	editTemplate,
	firebase,
	user,
	templateFields,
	setTemplateFields,
	updateFieldChanged,
	fields,
	setFields,
	error,
	setError,
	resetFields,
	photo,
	setPhoto,
	adminSection,
}) => {
	const [success, setSuccess] = useState<boolean>(false);

	const handlePhotoUpload = async (e?: MouseEvent): Promise<void> => {
		e && e.preventDefault();
		if (photo) {
			setPhoto({ file: photo.file, uploaded: true });
			const storageRef = firebase.storage
				.ref()
				.child(adminSection.editingNoun + '-images/' + photo.file.name);
			await storageRef
				.put(photo.file)
				.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
					setUploadState(snapshot.state);
					return snapshot.ref.getDownloadURL();
				})
				.then((url: string) => setPhotoURL(url))
				.catch((e: Error) => setError(e.message));
		}
	};

	const [uploadState, setUploadState] = useState<string | null>(null);
	const [photoURL, setPhotoURL] = useState<string | null>(null);

	return (
		<div className='col-12 col-md-9'>
			<AddAlerts
				editTemplate={editTemplate}
				error={error}
				success={success}
				editingNoun={adminSection.editingNoun}
			/>
			<form>
				{adminSection.photo && (
					<AddPhotoUpload
						photo={photo}
						setPhoto={setPhoto}
						firebase={firebase}
						setError={setError}
						handlePhotoUpload={handlePhotoUpload}
						photoURL={photoURL}
						uploadState={uploadState}
					/>
				)}
				<TemplateFields
					templateFields={templateFields}
					setTemplateFields={setTemplateFields}
					updateFieldChanged={updateFieldChanged}
				/>
				<ExtraFields
					fields={fields}
					setFields={setFields}
					updateFieldChanged={updateFieldChanged}
				/>
				<AddButtons
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
					adminSection={adminSection}
				/>
			</form>
		</div>
	);
};

export default withAuth(withFirebase(AddItem));
