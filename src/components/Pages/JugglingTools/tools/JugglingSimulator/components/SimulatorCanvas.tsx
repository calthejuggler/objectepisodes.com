import React, {
	useRef,
	useEffect,
	useState,
	FC,
	Dispatch,
	SetStateAction,
	MutableRefObject
} from 'react';

interface Props {
	balls: Array<any>;
	setBalls: Dispatch<SetStateAction<Array<any>>>;
}

const SimulatorCanvas: FC<Props> = props => {
	const { balls, setBalls } = props;

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const [simWidth, setSimWidth] = useState<number>(320);
	const [simHeight, setSimHeight] = useState<number>(400);

	useEffect(() => {
		// Fill canvas black
		let requestId: number,
			i: number = 0;
		const render = () => {
			const canvas: HTMLCanvasElement | null = canvasRef.current;
			if (canvas !== null) {
				const ctx: CanvasRenderingContext2D | null = canvas.getContext(
					'2d'
				);
				if (ctx !== null) {
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
				}
			}
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
			className='d-block m-auto'
		></canvas>
	);
};

export default SimulatorCanvas;
