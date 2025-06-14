import express from 'express';

import { createTweet } from '../../controllers/tweet-controller.js';

const router = express.Router();
console.log("inside route");
router.post('/tweets', createTweet);

export default router;
