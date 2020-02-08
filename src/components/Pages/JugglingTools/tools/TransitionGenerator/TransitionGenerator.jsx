import React from 'react';
import { useState } from 'react';

const TransitionGenerator = props => {
	const [ss1, setSs1] = useState('');
	const [ss2, setSs2] = useState('');

	const [transPeriod1, setTransPeriod1] = useState(0);
	const [transPeriod2, setTransPeriod2] = useState(0);

	const [maxH1, setMaxH1] = useState(0);
	const [maxH2, setMaxH2] = useState(0);

	return (
		<div className='card'>
			<div className='card-body'>
				<h3 className='text-center'>Transition Generator</h3>
				<div className='row'>
					<div className='col-12 col-md-6'>
						<form>
							<div className='form-group'>
								<label htmlFor='ss1'>Siteswap #1</label>
								<input
									type='number'
									name='ss1'
									id='ss1Input'
									className='form-control'
									value={ss1}
									onChange={e => {
										setSs1(e.target.value);
									}}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='ss2'>Siteswap #2</label>
								<input
									type='number'
									name='ss2'
									id='ss2Input'
									className='form-control'
									value={ss2}
									onChange={e => {
										setSs2(e.target.value);
									}}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='period1'>
									Transition #1 Length
								</label>
								<select
									name='period1'
									id='period1Select'
									className='custom-select'
									value={transPeriod1}
									onChange={e => {
										setTransPeriod1(e.target.value);
									}}>
									<option value={0}>Lowest Period</option>
									{new Array(7)
										.fill(undefined)
										.map((value, i) => (
											<option value={i + 1}>
												Lowest Period + {i + 1}
											</option>
										))}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='period2'>
									Transition #2 Length
								</label>
								<select
									name='period2'
									id='period2Select'
									className='custom-select'
									value={transPeriod2}
									onChange={e => {
										setTransPeriod2(e.target.value);
									}}>
									<option value={0}>Lowest Period</option>
									{new Array(7)
										.fill(undefined)
										.map((value, i) => (
											<option value={i + 1}>
												Lowest Period + {i + 1}
											</option>
										))}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='maxH1'>Max Height #1</label>
								<select
									name='maxH1'
									id='maxH1Select'
									className='custom-select'
									value={maxH1}
									onChange={e => {
										setMaxH1(e.target.value);
									}}>
									{'3456789abcdefghijklmnopqrstuv'
										.split('')
										.map((value, i) => (
											<option value={value}>
												{value}
											</option>
										))}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='maxH2'>Max Height #2</label>
								<select
									name='maxH2'
									id='maxH2Select'
									className='custom-select'
									value={maxH2}
									onChange={e => {
										setMaxH2(e.target.value);
									}}>
									<option value={0}>No Max</option>
									{'3456789abcdefghijklmnopqrstuv'
										.split('')
										.map((value, i) => (
											<option value={value}>
												{value}
											</option>
										))}
								</select>
							</div>
						</form>
					</div>
					<div className='col-6'></div>
				</div>
			</div>
		</div>
	);
};

export default TransitionGenerator;
