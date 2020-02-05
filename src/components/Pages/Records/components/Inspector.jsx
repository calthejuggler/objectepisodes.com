import React from 'react';

const Inspector = props => {
	const { selectedRecord } = props;
	return <>{selectedRecord ? null : 'Please select a record to inspect.'}</>;
};

export default Inspector;
