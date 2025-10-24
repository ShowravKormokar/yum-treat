import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 text-center">
                        <div>
                            <h1 className="text-6xl font-bold text-[#c34c2e] mb-4">Oops!</h1>
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                                Something went wrong
                            </h2>
                            <p className="text-gray-600 mb-6">
                                We're sorry, but something unexpected happened.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-[#c34c2e] text-white py-2 px-4 rounded-md hover:bg-[#a53e24] transition-colors"
                            >
                                Reload Page
                            </button>
                            <Link
                                to="/"
                                className="block w-full text-center text-[#c34c2e] hover:text-[#a53e24] transition-colors"
                            >
                                Go back home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;