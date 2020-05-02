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
	adminSection: { title: string };
}

const EditPropTemplate: FC<Props> = ({
	templateFields,
	setTemplateFields,
	updateFieldChanged,
	editTemplate,
	firebase,
	adminSection,
}) => {
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const createDataObjectAndUpload = () => {
		let objectPlaceholder: { [key: string]: string } = {};
		let thereIsAnEmptyField = false;
		templateFields.forEach((tempField, i) => {
			if (tempField[0] === '') thereIsAnEmptyField = true;
			return (objectPlaceholder[i.toString()] = tempField[0]);
		});
		if (thereIsAnEmptyField) {
			setError('You have left a template field empty.');
		} else {
			uploadData(objectPlaceholder);
		}
	};
	const uploadData = (objectPlaceholder: { [key: string]: string }) => {
		firebase.db
			.collection('database-templates')
			.doc(adminSection.title)
			.set(objectPlaceholder)
			.then(handleTemplateChangeSuccess)
			.catch((e: ErrorEvent) => setError(e.message));
	};
	const handleTemplateChangeSuccess = () => setSuccess(true);
	return (
		<>
			<div className='col-12 col-md-9'>
				<PropTemplateFields
					templateFields={templateFields}
					setTemplateFields={setTemplateFields}
					updateFieldChanged={updateFieldChanged}
					editTemplate={editTemplate}
				/>
			</div>
			<div className='col-12 col-md-9 offset-md-3 mb-3'>
				<div className='row justify-content-around'>
					<div className='col text-center'>
						<button
							className='btn btn-secondary text-center'
							onClick={(e) => {
								e.preventDefault();
								setSuccess(false);
								setError(null);
								setTemplateFields((prev) => [
									...prev,
									['', ''],
								]);
							}}
						>
							+ Add Field
						</button>
					</div>
					<div className='col text-center'>
						<button
							className='btn btn-primary text-center'
							onClick={(e) => {
								e.preventDefault();
								setSuccess(false);
								setError(null);
								createDataObjectAndUpload();
							}}
						>
							Save Template
						</button>
					</div>
				</div>
			</div>
			{error && <div className='alert alert-danger col-12'>{error}</div>}
			{success && (
				<div className='col-12'>
					<div className='alert alert-success'>
						You have successfully changed the template!
					</div>
				</div>
			)}
		</>
	);
};

export default withFirebase(EditPropTemplate);
