import { nanoid } from 'nanoid';
import * as pollService from '../services/poll.service.js';
import asyncHandler from 'express-async-handler';
import Poll from '../models/Poll.js';
import Vote from '../models/Vote.js';


export const getAllPublicPolls = asyncHandler(async (req, res) => {
    const polls = await pollService.getAllPublicPolls();
    res.status(200).json({ success: true, data: polls });
});

export const createPoll = asyncHandler(async (req, res) => {
    const { question, options, expiry, hideResults, isPrivate } = req.body;
    // Calculate expiry time
    const expiryHours = parseInt(expiry);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expiryHours);


    const pollData = {
        id: nanoid(10),
        question,
        options,
        expiresAt,
        hideResults,
        isPrivate,
    };

    const poll = await pollService.createPoll(pollData);
    res.status(201).json({ success: true, data: poll });
});

export const getPoll = asyncHandler(async (req, res) => {
    const poll = await pollService.getPollById(req.params.id);
    if (!poll) {
        res.status(404);
        throw new Error('Poll not found');
    }
    const hasExpired = new Date() > new Date(poll.expiresAt);

    res.status(200).json({
        success: true,
        data: {
            ...poll.toObject(),
            hasExpired
        }
    });
});

export const votePoll = asyncHandler(async (req, res) => {
    const { optionIndex } = req.body;
    const updatedPoll = await pollService.incrementVote(req.params.id, optionIndex);

    if (!updatedPoll) {
        res.status(404);
        throw new Error('Poll not found');
    }

    res.status(201).json({ success: true, data: updatedPoll });

});


export const getPollResult = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const poll = await Poll.findOne({ id });

    if (!poll) {
        return new Error('Poll not found');
    }

    const hasExpired = new Date() > new Date(poll.expiresAt);
    if (poll.hideResults && !hasExpired) {
        return res.status(403).json({
            success: false,
            error: 'Results are hidden until poll expires',
            expiresAt: poll.expiresAt
        });
    }
    const votes = await Vote.find({ pollId: id });
    // Calculate results
    const results = poll.options.map((option, index) => {
        const count = votes.filter(vote => vote.optionIndex === index).length;
        return {
            option,
            count,
            percentage: votes.length ? Math.round((count / votes.length) * 100) : 0
        };
    });

    const pollResult = {
        pollId: id,
        question: poll.question,
        totalVotes: votes.length,
        results,
        hasExpired
    };

    res.status(200).json({ success: true, data: pollResult });
});

export const addReactOnPoll = asyncHandler(async (req, res) => {
    const { type } = req.body;
    const updatedPoll = await pollService.addReactOnPoll(req.params.id, type);

    if (!updatedPoll) {
        res.status(404).json({ success: false, error: 'Poll not found' });
    }

    res.status(200).json({ success: true, data: updatedPoll });
});


export const addCommentOnPoll = asyncHandler(async (req, res) => {
    const { comment } = req.body;
    const pollComment = await pollService.addCommentOnPoll(req.params.id, comment);

    if (!pollComment) {
        res.status(404).json({ success: false, error: 'Poll not found' });
    }

    res.status(200).json({ success: true, data: pollComment });
});


export const getPollComments = asyncHandler(async (req, res) => {

    // check if poll exists
    const poll = await pollService.getPollById(req.params.id);
    if (!poll) {
        res.status(404).json({ success: false, error: 'Poll not found' });
    }
    const comments = await pollService.getPollComments(req.params.id);
    res.status(200).json({ success: true, data: comments });
});


