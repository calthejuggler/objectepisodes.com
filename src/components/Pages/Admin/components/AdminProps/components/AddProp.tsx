import React, {
	useState,
	ChangeEvent,
	FC,
	useEffect,
	FormEvent,
	useCallback,
} from 'react';
import { withFirebase } from '../../../../../Firebase/context';
import Firebase from './../../../../../Firebase/config';
import { withAuth } from './../../../../../Session/withAuth';

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
		setFields([['', '']]);
	}, [firebase.db]);

	const handleAddSuccess = () => {
		setError(null);
		setSuccess(true);
		resetFields();
	};

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

	useEffect(() => {
		resetFields();
	}, [resetFields]);

	return (
		<div className='col-12 col-md-9'>
			{editTemplate && (
				<div className='alert alert-danger mt-3'>
					You are currently editing the template for new Props. NOT
					adding a single prop. Changes made here will apply to all
					previous and future prop posts. Be sure that you want to
					make any changes before clicking submit.
				</div>
			)}
			<h3>Add Prop</h3>
			{error && <div className='alert alert-danger'>{error}</div>}
			{success && (
				<div className='alert alert-success'>
					The prop has been added to the database!
				</div>
			)}
			<form>
				{templateFields.map((templateField, i) => (
					<div key={'template' + i.toString()}>
						<div className='row'>
							<div className='col-8'>Template Field #{i + 1}</div>
							<div className='col-4'>
								<button
									className='btn btn-danger btn-sm'
									onClick={() => {
										setTemplateFields((prev) => {
											let newArr = prev;
											newArr.splice(i, 1);
											return newArr;
										});
									}}
								>
									X
								</button>
							</div>
						</div>
						<div className='form-group row'>
							<div className='col-12'>
								<input
									type='text'
									className='form-control disabled'
									placeholder={templateFields[i][0]}
									disabled
								/>
							</div>
							<div className='col-12'>
								<input
									type='text'
									className='form-control'
									onChange={updateFieldChanged(i, 1, true)}
									value={templateFields[i][1]}
								/>
							</div>
						</div>
					</div>
				))}
				{fields.map((field, i) => (
					<div key={'field' + i.toString()}>
						<div className='row'>
							<div className='col-8'>Field #{i + 1}</div>
							<div className='col-4'>
								<button
									className='btn btn-danger btn-sm'
									onClick={() => {
										setFields((prev) => {
											let newArr = prev;
											newArr.splice(i, 1);
											return newArr;
										});
									}}
								>
									X
								</button>
							</div>
						</div>
						<div className='form-group row'>
							<div className='col-12'>
								<input
									type='text'
									className='form-control'
									onChange={updateFieldChanged(i, 0, false)}
									value={fields[i][0]}
								/>
							</div>
							<div className='col-12'>
								<input
									type='text'
									className='form-control'
									onChange={updateFieldChanged(i, 1, false)}
									value={fields[i][1]}
								/>
							</div>
						</div>
					</div>
				))}
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
			</form>
		</div>
	);
};

export default withAuth(withFirebase(AddProp));
