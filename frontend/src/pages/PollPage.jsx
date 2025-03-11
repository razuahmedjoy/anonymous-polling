import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { format } from 'date-fns';
import { pollsApi } from '../services/api';
import ErrorComponent from '../components/ErrorComponent';
import LoadingComponent from '../components/LoadingComponent';
import CommentSection from '../components/CommentSection';
import PollTimer from '../components/PollTimer';
import ShareButtons from '../components/ShareButtons';
import PollReactions from '../components/ReactOnPolls';

const PollPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [isVoting, setIsVoting] = useState(false);
    const [votingComplete, setVotingComplete] = useState(false);
    const [copied, setCopied] = useState(false);

    const fetchPoll = async () => {
        try {
            const response = await pollsApi.getPoll(id);
            if (response.success) {
                setPoll(response.data);
            } else {
                setError('Failed to load poll');
            }
        } catch (err) {
            setError('Poll not found or may have expired');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!id) return;



        fetchPoll();
    }, [id]);

    const handleVote = async () => {
        if (selectedOption === null || !id) return;

        setIsVoting(true);
        try {
            const response = await pollsApi.submitVote(id, selectedOption);
            if (response.success) {
                setVotingComplete(true);
            } else {
                setError('Failed to submit vote');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setIsVoting(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <LoadingComponent />
        );
    }

    if (error) {
        return (
            <ErrorComponent error={error} />
        );
    }

    if (!poll) {
        return null;
    }

    // If user has voted, redirect to results
    if (votingComplete) {
        navigate(`/results/${id}`);
        return null;
    }
    console.log(poll);
    const expiresAt = new Date(poll.expiresAt);
    const hasExpired = poll.hasExpired;

    return (
        <div className="max-w-3xl mx-auto my-12">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-4">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white break-words">{poll.question}</h1>

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

                {hasExpired ? (
                    <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 rounded-md">
                        This poll has expired. You can view the results but can no longer vote.
                    </div>
                ) : (
                    <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex justify-between items-center">
                            <div>
                                <span>Expires @</span>

                                <span className="mx-1">•</span>
                                <span>{format(expiresAt, 'PPp')}</span>
                            </div>

                            {
                                poll && <PollReactions pollId={id} poll={poll} />
                            }
                        </div>
                        <PollTimer expiresAt={expiresAt} />
                    </div>
                )}

                <div className="space-y-3 mb-6">
                    {poll.options.map((option, index) => (
                        <label
                            key={index}
                            className={`block p-4 border rounded-md cursor-pointer transition-colors
                ${selectedOption === index
                                    ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900 dark:border-indigo-400'
                                    : 'bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700'
                                }
                ${hasExpired ? 'opacity-60 cursor-not-allowed' : ''}
              `}
                        >
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="poll-option"
                                    value={index}
                                    checked={selectedOption === index}
                                    onChange={() => !hasExpired && setSelectedOption(index)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    disabled={hasExpired}
                                />
                                <span className="ml-3 text-gray-900 dark:text-white">{option}</span>
                            </div>
                        </label>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button
                        onClick={handleVote}
                        disabled={selectedOption === null || isVoting || hasExpired}
                        className={`w-full sm:w-auto flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white
              ${selectedOption === null || hasExpired
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            }
            `}
                    >
                        {isVoting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : hasExpired ? (
                            'Poll Expired'
                        ) : (
                            'Submit Vote'
                        )}
                    </button>


                    <Link
                        to={`/results/${id}`}
                        className="w-full sm:w-auto flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        View Results
                    </Link>

                </div>
            </div>

            {!hasExpired && poll.hideResults && (
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md text-blue-800 dark:text-blue-100 text-sm">
                    Note: The poll creator has chosen to hide results until the poll expires.
                </div>
            )}

            <div>
                <CommentSection pollId={id} hasExpired={hasExpired} />
            </div>
        </div>
    );
};

export default PollPage;