import React from 'react';
import SearchTools from './components/SearchTools';
import { useState } from 'react';
import Inspector from './components/Inspector';
import RecordsList from './components/RecordsList';

const Records = () => {
	const [sortBy, setSortBy] = useState('recorded');
	const [sortDirection, setSortDirection] = useState('desc');

	const [recordType, setRecordType] = useState(null);

	const [selectedRecord, setSelectedRecord] = useState(null);

	return (
		<>
			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							<SearchTools
								setSortBy={setSortBy}
								setSortDirection={setSortDirection}
								sortBy={sortBy}
								sortDirection={sortDirection}
								recordType={recordType}
								setRecordType={setRecordType}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='row my-3'>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							<Inspector selectedRecord={selectedRecord} />
						</div>
					</div>
				</div>
			</div>
			<div className='row mb-3'>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							<RecordsList
								selectedRecord={selectedRecord}
								setSelectedRecord={setSelectedRecord}
								sortBy={sortBy}
								sortDirection={sortDirection}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Records;
