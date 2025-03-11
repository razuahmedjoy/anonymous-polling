import React from 'react';
import { Link } from 'react-router';

const ErrorComponent = ({ error = "Something Went Wrong" }) => {
    return (
        <div className="max-w-3xl mx-auto text-center mt-16">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Error</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
                <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create a new poll
                </Link>
            </div>
        </div>
    );
};

export default ErrorComponent;