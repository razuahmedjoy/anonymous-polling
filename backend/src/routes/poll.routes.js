import express from 'express';
import {
    addCommentOnPoll,
    addReactOnPoll,
    createPoll,
    getAllPublicPolls,
    getPoll,
    getPollComments,
    getPollResult,
    votePoll
} from '../controllers/poll.controller.js';

const router = express.Router();

router.post('/', createPoll);
router.get('/', getAllPublicPolls);
router.get('/:id', getPoll);
router.post('/:id/vote', votePoll);
// get poll result
router.get('/:id/results', getPollResult);

router.post('/:id/react', addReactOnPoll);

router.post('/:id/comment', addCommentOnPoll);

router.get('/:id/comments', getPollComments);


export default router;