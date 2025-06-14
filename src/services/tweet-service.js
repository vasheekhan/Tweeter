import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }
    

    async create(data) {
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g)
                        .map((tag) => tag.substring(1).toLowerCase()); // this regex extracts hashtags

        const tweet = await this.tweetRepository.create(data);//tweet creation
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags); //find which tags is already present 
        let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title); //title of present tags
        let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));//to get new tags 
        newTags = newTags.map(tag => {
            return {title: tag, tweets: [tweet.id]}
        });
        await this.hashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet;
    }
}

export default TweetService;

/*
    this is my #first #tweet . I am really #excited
*/