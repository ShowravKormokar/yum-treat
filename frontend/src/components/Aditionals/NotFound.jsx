import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h1 className="text-9xl font-bold text-[#c34c2e]">404</h1>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Page not found
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#c34c2e] hover:bg-[#a53e24] transition-colors duration-300"
                    >
                        Go back home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="block w-full text-center text-sm font-medium text-[#c34c2e] hover:text-[#a53e24] transition-colors duration-300"
                    >
                        Or go back to previous page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;