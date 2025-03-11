import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { pollsApi } from '../services/api';
import toast from 'react-hot-toast';

const PollForm = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [expiry, setExpiry] = useState('24');
    const [hideResults, setHideResults] = useState(false);
    const [isPrivate, setIsPrivate] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const addOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        }
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            const newOptions = [...options];
            newOptions.splice(index, 1);
            setOptions(newOptions);
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validate form
        if (question.trim() === '') {
            setError('Question is required');
            setIsLoading(false);
            return;
        }

        const filteredOptions = options.filter(option => option.trim() !== '');
        if (filteredOptions.length < 2) {
            setError('At least two options are required');
            setIsLoading(false);
            return;
        }

        try {
            const questionData = {
                question,
                options: filteredOptions,
                expiry,
                hideResults,
                isPrivate,
            };
            console.log(questionData);
            const response = await pollsApi.createPoll({
                question,
                options: filteredOptions,
                expiry,
                hideResults,
                isPrivate,
            });

            if (response.success) {
                // clear form
                toast.success('Poll created successfully');
                setQuestion('');
                navigate(`/polls/${response.data.id}`);
            } else {
                setError('Failed to create poll');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto text-white">
            <h2 className="text-xl font-semibold  mb-6">
                Create a new poll
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="question"
                        className="block text-sm font-medium  mb-1"
                    >
                        Question
                    </label>
                    <input
                        type="text"
                        id="question"
                        placeholder="Ask a question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 "
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium  mb-1">
                        Options
                    </label>
                    {options.map((option, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 "
                                disabled={isLoading}
                            />
                            {options.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => removeOption(index)}
                                    className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                    disabled={isLoading}
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}

                    {options.length < 10 && (
                        <button
                            type="button"
                            onClick={addOption}
                            className="mt-2 inline-flex items-center text-sm text-white dark:text-indigo-400  dark:hover:text-indigo-300"
                            disabled={isLoading}
                        >
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add option
                        </button>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium  mb-1">
                        Poll Expiry
                    </label>
                    <select
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm  "
                        disabled={isLoading}
                    >
                        <option className='text-black' value="1">1 hour</option>
                        <option className='text-black' value="12">12 hours</option>
                        <option className='text-black' value="24">24 hours</option>
                    </select>
                </div>

                <div className="mb-4 space-y-3">
                    <div className="flex items-center">
                        <input
                            id="hideResults"
                            type="checkbox"
                            checked={hideResults}
                            onChange={(e) => setHideResults(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                            disabled={isLoading}
                        />
                        <label
                            htmlFor="hideResults"
                            className="ml-2 block text-sm "
                        >
                            Hide results until poll expires
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="isPrivate"
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                            disabled={isLoading}
                        />
                        <label
                            htmlFor="isPrivate"
                            className="ml-2 block text-sm "
                        >
                            Private poll (only accessible via link)
                        </label>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Poll'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PollForm;