import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { format, formatDistance } from 'date-fns';
import { pollsApi } from '../services/api';

const ResultsPage = () => {
    const { id } = useParams();
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [hiddenUntil, setHiddenUntil] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchResults = async () => {
            try {
                const response = await pollsApi.getPollResults(id);
                if (response.success) {
                    setResults(response.data);
                } else {
                    if (response.error === 'Results are hidden until poll expires') {
                        setHiddenUntil(new Date(response.expiresAt));
                    } else {
                        setError(response.error || 'Failed to load results');
                    }
                }
            } catch (err) {
                if (err.response && err.response.status === 403 && err.response.data.expiresAt) {
                    setHiddenUntil(new Date(err.response.data.expiresAt));
                } else {
                    setError('Results not found or may have expired');
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [id]);

    const copyToClipboard = () => {
        // Remove 'results' from the URL to get the poll URL
        const pollUrl = window.location.href.replace('/results', '');
        navigator.clipboard.writeText(pollUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    if (hiddenUntil) {
        return (
            <div className="max-w-3xl mx-auto mt-16">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
                    <svg className="h-16 w-16 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V4"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Results are hidden until poll expires
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        The poll creator has chosen to hide results until the poll expires on{' '}
                        {format(hiddenUntil, 'PPp')} ({formatDistance(hiddenUntil, new Date(), { addSuffix: true })}).
                    </p>
                    <Link
                        to={`/polls/${id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Back to Poll
                    </Link>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto text-center">
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
    }

    if (!results) {
        return null;
    }

    // Calculate the max votes to normalize bar widths
    const maxVotes = Math.max(...results.results.map((r) => r.count));

    return (
        <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-4">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white break-words">
                        {results.question}
                    </h1>

                    <button
                        onClick={copyToClipboard}
                        className="ml-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Copy link"
                    >
                        {copied ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">{results.totalVotes}</span> total votes
                    {results.hasExpired && <span className="ml-2">(Poll has ended)</span>}
                </div>

                <div className="space-y-4 mb-6">
                    {results.results.map((result, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-gray-900 dark:text-white">{result.option}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                    {result.count} votes ({result.percentage}%)
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div
                                    className="bg-indigo-600 h-2.5 rounded-full"
                                    style={{
                                        width: maxVotes ? `${(result.count / maxVotes) * 100}%` : '0%',
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <Link
                        to={`/polls/${id}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Back to Poll
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;