import React, { useState, useEffect } from 'react';
import { pollsApi } from '../services/api';

// Define the reaction types and their emojis
const REACTION_TYPES = [
    { type: 'likes', emoji: '👍', label: 'Like' },
    { type: 'trending', emoji: '🔥', label: 'Trending' }
];

const PollReactions = ({
    poll,
    pollId,
    disabled = false,
    className = ''
}) => {
    const [reactions, setReactions] = useState({});
    const [loading,] = useState(false);
    const [error,] = useState('');

    // Create a cookie-based or local storage ID to track user reactions
    const [, setUserId] = useState('');

    useEffect(() => {
        // Generate a semi-persistent user ID if not exists
        const storedUserId = localStorage.getItem('anonymous_user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            const newUserId = 'anon_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('anonymous_user_id', newUserId);
            setUserId(newUserId);
        }

        if (poll) {
            setReactions(poll.reactions);
        }
    }, [pollId, poll]);

    const handleReaction = async (reactionType) => {
        if (disabled || loading) return;

        // Optimistically update UI
        setReactions(prev => ({
            ...prev,
            [reactionType]: prev[reactionType] + 1
        }));

        try {
            await pollsApi.addReaction(pollId, reactionType);
        } catch (err) {
            console.error('Error handling reaction:', err);
        }
    };

    return (
        <div className={`${className}`}>
            <div className="flex flex-wrap gap-2">
                {REACTION_TYPES.map((reactionType) => {
                    const count = reactions[reactionType.type] || 0;

                    return (
                        <button
                            key={reactionType.type}
                            onClick={() => handleReaction(reactionType.type)}
                            disabled={disabled}
                            className={`flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer 
                ${count > 0
                                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                ${!disabled ? 'hover:bg-gray-200 dark:hover:bg-gray-600' : 'opacity-75 cursor-default'}
                transition-colors duration-200
              `}
                            aria-label={`${reactionType.label} reaction`}
                        >
                            <span className="mr-1.5">{reactionType.emoji}</span>
                            <span>{count}</span>
                        </button>
                    );
                })}
            </div>

            {error && (
                <div className="text-sm text-red-600 dark:text-red-400 mt-2">
                    {error}
                </div>
            )}
        </div>
    );
};

export default PollReactions;
