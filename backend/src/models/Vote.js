import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
    pollId: {
        type: String,
        required: true,
    },
    optionIndex: {
        type: Number,
        required: true,
    },
    votedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Vote', VoteSchema);