import express from 'express';

import { createTweet,getTweet } from '../../controllers/tweet-controller.js';
import { toggleLike } from '../../controllers/like-controller.js';
import { createComment } from '../../controllers/comment-controller.js';
import { signup,login} from '../../controllers/auth-controller.js';
import { validateUser } from '../../middleware/validateUser.js';
import { authenticate } from '../../middleware/authenticate.js'

const router = express.Router();
console.log("inside route");
router.post('/tweets', authenticate, createTweet);
router.post('/likes/toggle',toggleLike);

router.get('/tweets/:id', getTweet);

router.post('/comments',authenticate, createComment);
router.post('/signup',validateUser,signup);
router.post('/login', login);

export default router;
