import React, {
	useState,
	ChangeEvent,
	MouseEvent,
	FC,
	Dispatch,
	SetStateAction,
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
}) => {
	const [success, setSuccess] = useState<boolean>(false);

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
