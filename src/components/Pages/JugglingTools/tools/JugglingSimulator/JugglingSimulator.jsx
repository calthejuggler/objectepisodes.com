import React from 'react';
import SimulatorCanvas from './components/SimulatorCanvas';
import { useState } from 'react';

const JugglingSimulator = () => {
	const [balls, setBalls] = useState([
		{
			x: 250,
			y: (250 * -3.7) ** 2 + 24.7,
			s: 10,
		},
		{
			x: 100,
			y: 150,
			s: 10,
		},
	]);

	const [siteswap, setSiteswap] = useState([3]);

	return (
		<div className='col-12 col-md-6'>
			<div className='card'>
				<div className='card-body'>
					<SimulatorCanvas balls={balls} setBalls={setBalls} />
				</div>
			</div>
		</div>
	);
};

export default JugglingSimulator;
