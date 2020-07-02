import React, { Component, ErrorInfo } from 'react';

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
			// Error pathF
			return (
				<div>
					<h2>Something went wrong.</h2>
					<details style={{ whiteSpace: 'pre-wrap' }}>
						{this.state.error && this.state?.error.toString()}
						<br />
						{this.state.errorInfo &&
							this.state.errorInfo.componentStack}
					</details>
				</div>
			);
		}
		// Normally, just render children
		return this.props.children;
	}
}
