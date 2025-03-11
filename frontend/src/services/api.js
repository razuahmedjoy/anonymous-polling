import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const pollsApi = {
    getAllPolls: async () => {
        const response = await api.get('/polls');
        return response.data;
    },
    // Create a new poll
    createPoll: async (pollData) => {
        const response = await api.post('/polls', pollData);
        return response.data;
    },

    // Get a poll by ID
    getPoll: async (id) => {
        const response = await api.get(`/polls/${id}`);
        return response.data;
    },

    // Submit a vote
    submitVote: async (id, optionIndex) => {
        const response = await api.post(`/polls/${id}/vote`, { optionIndex });
        return response.data;
    },

    // Get poll results
    getPollResults: async (id) => {
        const response = await api.get(`/polls/${id}/results`);
        return response.data;
    },

    // Add reaction to a poll
    addReaction: async (id, type) => {
        const response = await api.post(`/polls/${id}/react`, { type });
        return response.data;
    },

    // Add comment to a poll
    addComment: async (id, comment) => {
        const response = await api.post(`/polls/${id}/comment`, { comment });
        return response.data;
    },

    // Get comments for a poll
    getComments: async (id) => {
        const response = await api.get(`/polls/${id}/comments`);
        return response.data;
    },
};