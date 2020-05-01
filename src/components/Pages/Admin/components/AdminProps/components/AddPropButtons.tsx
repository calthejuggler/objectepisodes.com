import React, {
	Dispatch,
	SetStateAction,
	FC,
	FormEvent,
	MouseEvent,
} from 'react';
import Firebase from './../../../../../Firebase/config';

interface Props {
	setFields: Dispatch<SetStateAction<string[][]>>;
	setSuccess: Dispatch<SetStateAction<boolean>>;
	setError: Dispatch<SetStateAction<string | null>>;
	templateFields: string[][];
	fields: string[][];
	firebase: Firebase;
	user: { displayName: string };
	resetFields: CallableFunction;
	photo: { file: File; uploaded: boolean } | null;
	handlePhotoUpload: (e?: MouseEvent) => Promise<void>;
}

const AddPropButtons: FC<Props> = ({
	setFields,
	setSuccess,
	templateFields,
	fields,
	firebase,
	user,
	setError,
	resetFields,
	photo,
	handlePhotoUpload,
}) => {
	const uploadData = (objectPlaceholder: { [key: string]: string }) => {
		firebase.db
			.collection('props-database')
			.doc()
			.set(objectPlaceholder)
			.then(handleAddSuccess)
			.catch((e: ErrorEvent) => setError(e.message));
	};
	const createDataObjectAndUpload = () => {
		let objectPlaceholder: { [key: string]: string } = {};
		templateFields.forEach(
			(tempField) => (objectPlaceholder[tempField[0]] = tempField[1])
		);
		fields.forEach(
			(field) =>
				field !== ['', ''] && (objectPlaceholder[field[0]] = field[1])
		);

		objectPlaceholder.added = firebase.dbFunc.FieldValue.serverTimestamp();
		objectPlaceholder.by = user.displayName;
		if (photo) {
			firebase.storage
				.ref()
				.child('prop-images/' + photo.file.name)
				.getDownloadURL()
				.then((url: string) => {
					objectPlaceholder.photoURL = url;
					uploadData(objectPlaceholder);
				});
		} else {
			let willWeContinue = true;
			templateFields.forEach((field) => {
				if (field[1] === '') willWeContinue = false;
			});
			fields.forEach((field) => {
				if (field[1] === '') willWeContinue = false;
			});
			if (!willWeContinue) {
				setError('All fields are required!');
			} else {
				uploadData(objectPlaceholder);
			}
		}
	};
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setSuccess(false);
		if (!photo?.uploaded) {
			handlePhotoUpload().then(() => {
				createDataObjectAndUpload();
			});
		} else {
			createDataObjectAndUpload();
		}
	};
	const handleAddSuccess = () => {
		setError(null);
		setSuccess(true);
		resetFields();
	};
	return (
		<>
			<button
				className='btn btn-secondary'
				onClick={(e) => {
					e.preventDefault();
					setFields((prev) => [...prev, ['', '']]);
				}}
			>
				+ Add Field
			</button>
			<button
				type='submit'
				className='btn btn-primary'
				onClick={handleSubmit}
			>
				Submit Prop
			</button>
		</>
	);
};

export default AddPropButtons;
