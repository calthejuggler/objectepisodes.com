import React from 'react';
import JugglingSimulator from './tools/JugglingSimulator/JugglingSimulator';

const JugglingTools = () => {
	return (
		<div className='row align-items-center'>
			<div className='col-12 col-md-4'>
				<JugglingSimulator />
			</div>
		</div>
	);
};

export default JugglingTools;
