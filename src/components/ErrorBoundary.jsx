import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.error("ErrorBoundary caught an error:", error, errorInfo);
		this.setState({
			error: error,
			errorInfo: errorInfo
		});
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="w-full flex items-center justify-center flex-col p-4">
					<h1 className="font-bold text-2xl text-white mt-2 text-center">
						Something went wrong.
					</h1>
					<p className="text-gray-400 mt-2 text-center">
						We're sorry, but something went wrong. Please try refreshing the page.
					</p>
					{process.env.NODE_ENV === 'development' && (
						<details className="mt-4 text-gray-400 text-sm whitespace-pre-wrap">
							<summary className="cursor-pointer text-white">Error details</summary>
							{this.state.error && this.state.error.toString()}
							<br />
							{this.state.errorInfo.componentStack}
						</details>
					)}
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;