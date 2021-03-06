import React, { Component, ErrorInfo } from 'react';

import logo from '../images/objectepisodes_logo.jpg';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
	public state: {
		error: Error | null;
		errorInfo: ErrorInfo | null;
		hasError: boolean;
	} = {
		error: null,
		errorInfo: null,
		hasError: false,
	};

	static getDerivedStateFromError(error: Error) {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					className='text-center'
					style={{ maxWidth: '650px', margin: '5rem auto' }}
				>
					<img
						src={logo}
						alt='The Object Episodes Logo'
						className='img-fluid mb-3'
					/>
					<h2>Whoops... We dropped!</h2>
					<p>
						Something went wrong here... We're doing our best to fix
						it, but if the problem persists - please send the
						following details to{' '}
						<a href='mailto:cal@objectepisodes.com'>
							cal@objectepisodes.com
						</a>
						.
					</p>
					<p>
						The most common error is caused by using an outdated
						version of your web browser (Chrome, Firefox, Safari).
					</p>
					<Link to='/'>
						<button className='btn btn-sm btn-primary mb-3'>
							Return to homepage
						</button>
					</Link>
					<details style={{ whiteSpace: 'pre-wrap' }}>
						{this.state.error && this.state?.error.toString()}
						<br />
						{this.state.errorInfo &&
							this.state.errorInfo.componentStack}
					</details>
				</div>
			);
		}
		return this.props.children;
	}
}
