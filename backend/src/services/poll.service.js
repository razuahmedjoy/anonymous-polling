import Poll from '../models/Poll.js';
import Vote from '../models/Vote.js';
import Comment from '../models/Comment.js';


export const getAllPublicPolls = async () => {
    return await Poll.find({ isPrivate: false }).sort({ createdAt: -1 });
};

export const createPoll = async (pollData) => {
    return await Poll.create(pollData);
};

export const getPollById = async (id) => {
    return await Poll.findOne({ id });
};

export const incrementVote = async (id, optionIndex) => {
    // Check if poll exists and has not expired
    const poll = await Poll.findOne({ id });
    if (!poll) {
        return res.status(404).json({ success: false, error: 'Poll not found' });
    }

    if (new Date() > new Date(poll.expiresAt)) {
        return res.status(410).json({ success: false, error: 'Poll has expired' });
    }


    // Create vote
    const vote = await Vote.create({
        pollId: id,
        optionIndex,
    });
    return vote;
};




export const addReactOnPoll = async (id, type) => {

    // Check if poll exists
    const poll = await Poll.findOne({ id });

    if (!poll) {
        return new Error('Poll not found');
    }


    const field = type === 'likes' ? 'reactions.likes' : 'reactions.trending';
    const updatedPoll = await Poll.findOneAndUpdate(
        { id },
        { $inc: { [field]: 1 } },
        { new: true }
    );

    return updatedPoll;
};


export const addCommentOnPoll = async (id, comment) => {
    // Check if poll exists
    const poll = await Poll.findOne({ id });

    if (!poll) {
        return new Error('Poll not found');
    }
    if (new Date() > new Date(poll.expiresAt)) {
        return new Error('Poll has expired');
    }

    const newcomment = await Comment.create({
        pollId: id,
        text: comment,
    });

    return newcomment;
}


export const getPollComments = async (id) => {
    const comments = await Comment.find({ pollId: id }).sort({ createdAt: -1 });
    return comments;
}