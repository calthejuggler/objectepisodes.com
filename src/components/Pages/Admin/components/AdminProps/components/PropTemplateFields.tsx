import React, { FC, Dispatch, SetStateAction, ChangeEvent } from 'react';

interface Props {
	templateFields: string[][];
	setTemplateFields: Dispatch<SetStateAction<string[][]>>;
	updateFieldChanged: (
		parentI: number,
		childI: number,
		template: boolean
	) => (e: ChangeEvent<HTMLInputElement>) => void;
}

const PropTemplateFields: FC<Props> = ({
	templateFields,
	setTemplateFields,
	updateFieldChanged,
}) => {
	return (
		<>
			{templateFields.map((templateField, i) => (
				<div key={'template' + i.toString()}>
					<div className='row'>
						<div className='col-12'>Template Field #{i + 1}</div>
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
		</>
	);
};

export default PropTemplateFields;
