import Tweet from '../models/tweet.js'
import CrudRepository from './CrudRepository.js';

class TweetRepository extends CrudRepository {
    constructor(){
        super(Tweet);
    }
    
async getWithComments(id) {
        try {
           const tweet = await Tweet.findById(id).populate({
                populate: {
                    path: 'comments'
                }
            }).lean();
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }



    async getAll(offset, limit) {
        try {
            const tweet = await Tweet.find().populate({path:"likes"}).skip(offset).limit(limit);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
    async find(id){
        try {
            const tweet=await Tweet.findById(id).populate({path:"likes"});
            return tweet;
        } catch (error) {
          console.log(error);  
        }
    }
}

export default TweetRepository;