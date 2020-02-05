import React from 'react';

const SearchTools = props => {
	const { sortBy, setSortBy, sortDirection, setSortDirection } = props;
	return (
		<>
			<div className='form-group'>
				<label htmlFor='recordTypeRadios'>Record Type:</label>
				<div className='custom-control custom-radio'>
					<input
						type='radio'
						name='recordTypeRadios'
						className='custom-control-input'
					/>
					<label
						className='custom-control-label'
						htmlFor='recordTypeRadios'>
						Time
					</label>
				</div>
				<div className='custom-control custom-radio'>
					<input
						type='radio'
						name='recordTypeRadios'
						className='custom-control-input'
					/>
					<label
						className='custom-control-label'
						htmlFor='recordTypeRadios'>
						Catches
					</label>
				</div>
			</div>
			<div className='input-group'>
				<div className='input-group-prepend'>
					<button
						className='btn btn-primary'
						onClick={() => {
							sortDirection === 'desc'
								? setSortDirection('asc')
								: setSortDirection('desc');
						}}>
						{sortDirection[0].toUpperCase() +
							sortDirection.slice(1) +
							'.'}
					</button>
				</div>
				<select
					name='sortBy'
					className='custom-select'
					value={sortBy}
					onChange={e => setSortBy(e.target.value)}>
					<option value='recorded'>Recorded</option>
					<option value='noOfProps'>No. of Props</option>
					<option value='catches'>Catches</option>
					<option value='time'>Time</option>
				</select>
			</div>
		</>
	);
};

export default SearchTools;
