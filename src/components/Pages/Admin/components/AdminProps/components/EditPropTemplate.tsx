import React, {
	FC,
	Dispatch,
	SetStateAction,
	ChangeEvent,
	useState,
} from 'react';
import PropTemplateFields from './PropTemplateFields';
import { withFirebase } from './../../../../../Firebase/context';
import Firebase from './../../../../../Firebase/index';

interface Props {
	templateFields: string[][];
	setTemplateFields: Dispatch<SetStateAction<string[][]>>;
	editTemplate: boolean;
	updateFieldChanged: (
		parentI: number,
		childI: number,
		template: boolean
	) => (e: ChangeEvent<HTMLInputElement>) => void;
	firebase: Firebase;
}

const EditPropTemplate: FC<Props> = ({
	templateFields,
	setTemplateFields,
	updateFieldChanged,
	editTemplate,
	firebase,
}) => {
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const createDataObjectAndUpload = () => {
		let objectPlaceholder: { [key: string]: string } = {};
		templateFields.forEach(
			(tempField, i) => (objectPlaceholder[i.toString()] = tempField[0])
		);
		console.dir(objectPlaceholder);
		uploadData(objectPlaceholder);
	};
	const uploadData = (objectPlaceholder: { [key: string]: string }) => {
		firebase.db
			.collection('database-templates')
			.doc('props')
			.set(objectPlaceholder)
			.then(handleTemplateChangeSuccess)
			.catch((e: ErrorEvent) => setError(e.message));
	};
	const handleTemplateChangeSuccess = () => setSuccess(true);
	return (
		<>
			{error && <div className='alert alert-danger'>{error}</div>}
			{success && (
				<div className='alert alert-success'>
					You have successfully changed the template!
				</div>
			)}
			<div className='col'>
				<PropTemplateFields
					templateFields={templateFields}
					setTemplateFields={setTemplateFields}
					updateFieldChanged={updateFieldChanged}
					editTemplate={editTemplate}
				/>
			</div>
			<div className='col-12 mb-3'>
				<div className='row justify-content-around'>
					<div className='col'>
						<button
							className='btn btn-secondary text-center'
							onClick={(e) => {
								e.preventDefault();
								setTemplateFields((prev) => [
									...prev,
									['', ''],
								]);
							}}
						>
							+ Add Field
						</button>
					</div>
					<div className='col'>
						<button
							className='btn btn-primary text-center'
							onClick={(e) => {
								e.preventDefault();
								createDataObjectAndUpload();
							}}
						>
							Save Template
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default withFirebase(EditPropTemplate);
