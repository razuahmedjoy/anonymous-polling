import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { pollsApi } from '../services/api';

const CommentSection = ({ pollId, hasExpired = false }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchComments();
    }, [pollId]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await pollsApi.getComments(pollId);
            if (response.success) {
                setComments(response.data);
            } else {
                setError('Failed to load comments');
            }
        } catch (err) {
            setError('An error occurred while loading comments');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) return;

        setSubmitting(true);
        setError('');

        try {
            const response = await pollsApi.addComment(pollId, newComment.trim());
            if (response.success) {
                setComments([response.data, ...comments]);
                setNewComment('');
            } else {
                setError('Failed to post comment');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Discussion
            </h2>

            {!hasExpired && (
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-2">
                        <textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            rows={3}
                            disabled={submitting}
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!newComment.trim() || submitting}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {submitting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}
                </form>
            )}

            {loading ? (
                <div className="flex justify-center py-4">
                    <svg className="animate-spin h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            ) : (
                <div className="space-y-4">
                    {comments.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No comments yet. Be the first to start the discussion!
                        </p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment._id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                                <div className="text-gray-900 dark:text-white whitespace-pre-wrap break-words">
                                    {comment.text}
                                </div>
                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {format(new Date(comment.createdAt), 'PPpp')}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentSection;