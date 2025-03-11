import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    hideResults: {
        type: Boolean,
        default: false,
    },
    isPrivate: {
        type: Boolean,
        default: true,
    },
    reactions: {
        likes: {
            type: Number,
            default: 0,
        },
        trending: {
            type: Number,
            default: 0,
        },
    },
});

export default mongoose.model('Poll', PollSchema);
