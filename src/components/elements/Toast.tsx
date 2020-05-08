import React, {
	FC,
	useEffect,
	Dispatch,
	SetStateAction,
	MouseEvent,
} from 'react';

import logo from '../../images/objectepisodes_logo.jpg';

import 'bootstrap/js/dist/toast';

import $ from 'jquery';

const Toast: FC<{
	message: string;
	cancelBtnText?: string;
	nextBtnText?: string;
	nextBtnFunc?: (e: MouseEvent) => void;
	autohide?: boolean;
	setToastActive: Dispatch<SetStateAction<false | string>>;
}> = ({
	message,
	cancelBtnText,
	nextBtnText,
	nextBtnFunc,
	autohide,
	setToastActive,
}) => {
	const closeToast = (e: MouseEvent) => {
		e.preventDefault();
		$('.toast').toast('hide');
		setToastActive(false);
	};
	useEffect(() => {
		$('.toast').toast('show');
	}, []);
	return (
		<div
			aria-live='polite'
			aria-atomic='true'
			style={{
				position: 'fixed',
				top: '0',
				left: '0',
				height: '100vh',
				width: '100vw',
				zIndex: 1000,
			}}
		>
			<div
				className='h-100 w-100 d-flex justify-content-center align-items-center'
				style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
			>
				<div
					className='toast'
					role='alert'
					aria-live='assertive'
					aria-atomic='true'
					data-autohide={autohide ? autohide : 'false'}
				>
					<div className='toast-header'>
						<img
							src={logo}
							className='mr-2'
							alt='ObjectEpisodes logo'
							style={{ width: '90%'}}
						/>
						<button
							type='button'
							className='ml-2 mb-1 close'
							aria-label='Close'
							onClick={closeToast}
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='toast-body'>{message}</div>
					<div className='row mb-3'>
						{!nextBtnText ? null : (
							<div className='col-6 text-center'>
								<button
									className='btn btn-sm btn-danger w-50'
									onClick={nextBtnFunc}
								>
									Yes
								</button>
							</div>
						)}
						{!cancelBtnText ? null : (
							<div className='col-6 text-center'>
								<button
									className='btn btn-sm btn-primary w-50'
									onClick={closeToast}
								>
									No
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Toast;
