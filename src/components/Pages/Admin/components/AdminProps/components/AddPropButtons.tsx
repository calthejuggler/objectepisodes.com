import React, { Dispatch, SetStateAction, FC, FormEvent } from 'react';
import withFirebase from './../../../../../../App';
import Firebase from './../../../../../Firebase/config';
import { withAuth } from './../../../../../Session/withAuth';

interface Props {
	setFields: Dispatch<SetStateAction<string[][]>>;
	setSuccess: Dispatch<SetStateAction<boolean>>;
	setError: Dispatch<SetStateAction<string | null>>;
	templateFields: string[][];
	fields: string[][];
	firebase: Firebase;
	user: { displayName: string };
	resetFields: CallableFunction;
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
}) => {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setSuccess(false);
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
		firebase.db
			.collection('props-database')
			.doc()
			.set(objectPlaceholder)
			.then(handleAddSuccess)
			.catch((e: ErrorEvent) => setError(e.message));
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
				onClick={() => {
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
