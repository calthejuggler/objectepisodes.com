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
	user: { uid: string };
	resetFields: CallableFunction;
	photo: { file: File; uploaded: boolean } | null;
	handlePhotoUpload: (e?: MouseEvent) => Promise<void>;
	adminSection: {
		title: string;
		editingNoun: string;
		photoRequired: boolean;
	};
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
	adminSection,
}) => {
	const uploadData = (objectPlaceholder: { [key: string]: string }) => {
		firebase.db
			.collection(adminSection.title + '-database')
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
		objectPlaceholder.by = user.uid;
		if (photo) {
			firebase.storage
				.ref()
				.child(adminSection.editingNoun + '-images/' + photo.file.name)
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
		if (adminSection.photoRequired && !photo) {
			setError(
				'A photo is required with posts in this database category'
			);
		} else {
			if (!photo?.uploaded) {
				handlePhotoUpload().then(() => {
					createDataObjectAndUpload();
				});
			} else {
				createDataObjectAndUpload();
			}
		}
	};
	const handleAddSuccess = () => {
		setError(null);
		setSuccess(true);
		resetFields();
	};
	return (
		<div className='row'>
			<div className='col-6 text-center'>
				<button
					className='btn btn-secondary'
					onClick={(e) => {
						e.preventDefault();
						setFields((prev) => [...prev, ['', '']]);
					}}
				>
					+ Add Field
				</button>
			</div>
			<div className='col-6 text-center'>
				<button
					type='submit'
					className='btn btn-primary'
					onClick={handleSubmit}
				>
					Submit Prop
				</button>
			</div>
		</div>
	);
};

export default AddPropButtons;
