import React, {
	FC,
	useState,
	ChangeEvent,
	useCallback,
	useEffect,
} from 'react';

import AddItem from './AddItem/AddItem';
import Firebase from '../../Firebase/config';
import { withFirebase } from '../../Firebase/context';
import EditTemplate from './EditTemplate/EditTemplate';
import EditItems from './EditItems/EditItems';

const AdminSection: FC<{
	editTemplate: boolean;
	adminSection: { title: string };
	firebase: Firebase;
}> = ({ editTemplate, firebase, adminSection }) => {
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
			if (e.target.value) {
				newArr[parentI][childI] =
					e.target.value[0].toUpperCase() + e.target.value.slice(1);
			} else {
				newArr[parentI][childI] = e.target.value;
			}
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
			.doc(adminSection.title)
			.get()
			.then((res: firebase.firestore.DocumentData) => {
				if (Object.keys(res.data()).length > 0) {
					let newTemplateFieldsWithNum: Array<string> = Object.values(
						res.data()
					);
					let newTemplateFields: Array<Array<
						string
					>> = newTemplateFieldsWithNum.map((field) => [field, '']);
					setTemplateFields(newTemplateFields);
				}
			})
			.catch((e: ErrorEvent) => setError(e.message));
		setFields([]);
		setPhoto(null);
	}, [firebase.db, adminSection.title]);

	useEffect(() => {
		resetFields();
	}, [resetFields, editTemplate]);
	return (
		<>
			{!editTemplate ? (
				<>
					<AddItem
						editTemplate={editTemplate}
						templateFields={templateFields}
						setTemplateFields={setTemplateFields}
						fields={fields}
						setFields={setFields}
						updateFieldChanged={updateFieldChanged}
						error={error}
						setError={setError}
						photo={photo}
						setPhoto={setPhoto}
						resetFields={resetFields}
						adminSection={adminSection}
					/>
				</>
			) : (
				<EditTemplate
					templateFields={templateFields}
					setTemplateFields={setTemplateFields}
					updateFieldChanged={updateFieldChanged}
					editTemplate={editTemplate}
					adminSection={adminSection}
				/>
			)}
			<EditItems adminSection={adminSection} setError={setError} />
		</>
	);
};

export default withFirebase(AdminSection);
