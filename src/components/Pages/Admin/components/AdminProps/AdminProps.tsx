import React, {
	FC,
	useState,
	ChangeEvent,
	useCallback,
	useEffect,
} from 'react';

import AddProp from './components/AddProp';
import Firebase from './../../../../Firebase/config';
import { withFirebase } from './../../../../Firebase/context';

const AdminProps: FC<{ editTemplate: boolean; firebase: Firebase }> = ({
	editTemplate,
	firebase,
}) => {
	const [templateFields, setTemplateFields] = useState<Array<Array<string>>>(
		[]
	);
	const [fields, setFields] = useState<Array<Array<string>>>([['', '']]);
	const [photo, setPhoto] = useState<{
		file: File;
		uploaded: boolean;
	} | null>(null);

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
	return (
		<>
			{!editTemplate ? (
				<>
					<AddProp
						editTemplate={editTemplate}
						templateFields={templateFields}
						setTemplateFields={setTemplateFields}
						fields={fields}
						setField={setFields}
						updateFieldChanged={updateFieldChanged}
						error={error}
						setError={setError}
						photo={photo}
						setPhoto={setPhoto}
						resetFields={resetFields}
					/>
					<div className='col-12 col-md-9'>Edit Props</div>
				</>
			) : (
				<div />
			)}
		</>
	);
};

export default withFirebase(AdminProps);
