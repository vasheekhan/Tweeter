import express from 'express';
import bodyParser from 'body-parser';

import {connectDB} from './config/database.js';

import apiRoutes from './routes/index.js';


import {UserRepository,TweetRepository} from "./repository/index.js"
import LikeService from './services/like-service.js';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoutes);


app.listen(3000, async () => {
    console.log('server started');
    await connectDB();
    const userRepo=new UserRepository();
    const tweetRepo=new TweetRepository();
    const tweet=await tweetRepo.getAll(0,3);
    console.log("tweets",tweet);

    const user=await userRepo.getAll()
    console.log("user",user);
    const likeService=new LikeService();
await  likeService.toggleLike(tweet[0].id,"Tweet",user[0].id)
    
});