import React, { FC, Dispatch, SetStateAction, ChangeEvent } from 'react';

interface Props {
	templateFields: string[][];
	setTemplateFields: Dispatch<SetStateAction<string[][]>>;
	updateFieldChanged: (
		parentI: number,
		childI: number,
		template: boolean
	) => (e: ChangeEvent<HTMLInputElement>) => void;
	editTemplate?: boolean;
}

const PropTemplateFields: FC<Props> = ({
	templateFields,
	setTemplateFields,
	updateFieldChanged,
	editTemplate,
}) => {
	return (
		<>
			{templateFields.map((templateField, i) => (
				<div key={'template' + i.toString()}>
					<div className='row'>
						<div className='col-6'>Template Field #{i + 1}</div>
						{i > 1 && editTemplate && (
							<div className='col-6 text-right'>
								<button
									className='btn btn-sm btn-danger'
									onClick={(e) => {
										let newArr = [...templateFields];
										newArr.splice(i, 1);
										setTemplateFields(newArr);
									}}
								>
									X
								</button>
							</div>
						)}
					</div>
					<div className='form-group row'>
						<div className='col-12'>
							<input
								type='text'
								className={
									editTemplate
										? 'form-control'
										: 'form-control disabled'
								}
								disabled={
									editTemplate
										? i <= 1
											? true
											: false
										: true
								}
								onChange={updateFieldChanged(i, 0, true)}
								value={templateFields[i][0]}
							/>
						</div>
						{!editTemplate && (
							<div className='col-12'>
								<input
									type='text'
									className='form-control'
									onChange={updateFieldChanged(i, 1, true)}
									value={templateFields[i][1]}
								/>
							</div>
						)}
					</div>
				</div>
			))}
		</>
	);
};

export default PropTemplateFields;
