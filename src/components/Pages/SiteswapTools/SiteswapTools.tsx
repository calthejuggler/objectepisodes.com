import React, { useState, FC, FormEvent } from 'react';

const SiteswapTools: FC = () => {
	const [inputSiteswapString, setInputSiteswapString] = useState<string>('3');

	const [inputSiteswapPeriod, setInputSiteswapPeriod] = useState<number>(1);
	const [inputSiteswapAverage, setInputSiteswapAverage] = useState<number>(3);

	const [inputSiteswapIsValid, setInputSiteswapIsValid] = useState<boolean>(
		true
	);

	const [error, setError] = useState<null | string>(null);

	const updateSiteswap = (e: FormEvent<HTMLInputElement>) => {
		const inputString = e.currentTarget.value;
		const inputArray = inputString.split('');
		const inputPeriod = inputArray.length;

		const alph = 'abcdefghijklmnopqrstuvwxyz';
		const alphArray = alph.split('');

		const inputArrayAsNumbers = inputArray.map((number: string) =>
			alphArray.includes(number)
				? alphArray.indexOf(number) + 10
				: parseInt(number)
		);

		const inputTotal = inputArrayAsNumbers.reduce((a, b) => a + b, 0);

		const inputAverage = inputTotal / inputPeriod;

		let inputIsValid = true;

		if (!Number.isInteger(inputAverage)) {
			inputIsValid = false;
			setError('Siteswap is invalid!');
		}

		setInputSiteswapIsValid(inputIsValid);
		if (inputIsValid) {
			setInputSiteswapString(inputString);
			setInputSiteswapPeriod(inputPeriod);
			setInputSiteswapAverage(inputAverage);
		} else {
			setInputSiteswapString(inputString);
			setInputSiteswapPeriod(inputPeriod);
			setInputSiteswapAverage(inputAverage);
		}
	};

	return (
		<>
			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							<div className='form-group'>
								{error && (
									<div className='alert alert-danger'>
										{error}
									</div>
								)}
								<label htmlFor='siteswapInput'>Siteswap:</label>
								<input
									type='text'
									name='siteswapInput'
									className='form-control'
									onChange={updateSiteswap}
									value={inputSiteswapString}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							<h2 className='text-center'>Siteswap Details</h2>
							<ul className='list-group list-group-flush'>
								<li className='list-group-item'>
									<div className='row'>
										<div className='col-6'>
											<b>Siteswap:</b>
										</div>
										<div className='col-6'>
											{inputSiteswapString}
										</div>
									</div>
								</li>
								<li className='list-group-item'>
									<div className='row'>
										<div className='col-6'>
											<b>Period:</b>
										</div>
										<div className='col-6'>
											{inputSiteswapPeriod}
										</div>
									</div>
								</li>
								<li className='list-group-item'>
									<div className='row'>
										<div className='col-6'>
											<b>Valid:</b>
										</div>
										<div className='col-6'>
											{inputSiteswapIsValid
												? 'Yes'
												: 'No'}
										</div>
									</div>
								</li>
								<li className='list-group-item'>
									<div className='row'>
										<div className='col-6'>
											<b>Props:</b>
										</div>
										<div className='col-6'>
											{inputSiteswapAverage}
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SiteswapTools;
