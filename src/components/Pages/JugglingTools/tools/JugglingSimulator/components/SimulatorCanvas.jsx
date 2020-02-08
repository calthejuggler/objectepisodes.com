import React, { useRef, useEffect, useState } from 'react';

const SimulatorCanvas = props => {
	const { balls, setBalls } = props;

	const canvasRef = useRef(null);

	const [simWidth, setSimWidth] = useState(320);
	const [simHeight, setSimHeight] = useState(400);

	useEffect(() => {
		// Fill canvas black
		let requestId,
			i = 0;
		const render = () => {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, simWidth, simHeight);

			ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.arc(
				simWidth / 2,
				simHeight / 2,
				(simWidth / 2) * Math.abs(Math.cos(i)),
				0,
				2 * Math.PI
			);
			ctx.fill();
			i += 0.05;
			requestId = requestAnimationFrame(render);
		};

		render();

		return () => {
			cancelAnimationFrame(requestId);
		};
	}, [simHeight, simWidth, balls]);

	return (
		<canvas
			ref={canvasRef}
			width={simWidth}
			height={simHeight}
			className='d-block m-auto'></canvas>
	);
};

export default SimulatorCanvas;
