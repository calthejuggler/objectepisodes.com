import React, { useRef, useEffect, useState } from 'react';

const SimulatorCanvas = props => {
	const { balls, setBalls } = props;

	const canvasRef = useRef(null);

	const [simWidth, setSimWidth] = useState(320);
	const [simHeight, setSimHeight] = useState(400);

	useEffect(() => {
		// Fill canvas black
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, simWidth, simHeight);
		ctx.fillStyle = 'red';
		for (let i = 0; i < balls.length; i++) {
			ctx.beginPath();
			ctx.arc(balls[i].x, balls[i].y, balls[i].s, 0, 2 * Math.PI, false);
			ctx.fill();
		}
		// update();
	}, [simHeight, simWidth, balls]);

	const update = () => {
		setBalls(prev => {
			return {
				x: prev.x++,
				y: prev.y,
			};
		});
	};

	return (
		<canvas ref={canvasRef} width={simWidth} height={simHeight}></canvas>
	);
};

export default SimulatorCanvas;
