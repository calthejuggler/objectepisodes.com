import React, { Dispatch, SetStateAction, ChangeEvent, FC } from 'react';

interface Props {
	fields: string[][];
	setFields: Dispatch<SetStateAction<string[][]>>;
	updateFieldChanged: (
		parentI: number,
		childI: number,
		template: boolean
	) => (e: ChangeEvent<HTMLInputElement>) => void;
}

const ExtraFields: FC<Props> = ({
	fields,
	setFields,
	updateFieldChanged,
}) => {
	return (
		<>
			{fields.map((field, i) => (
				<div key={'field' + i.toString()}>
					<div className='row'>
						<div className='col-6'>Extra Field #{i + 1}</div>
						<div className='col-6 text-right'>
							<button
								className='btn btn-danger btn-sm'
								onClick={(e) => {
									e.preventDefault();
									setFields((prev) => {
										let newArr = [...prev];
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
		</>
	);
};

export default ExtraFields;
