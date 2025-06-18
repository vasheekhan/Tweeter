import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }
    

    async create(data) {
    const content = data.content;

    // Extract hashtags (e.g., #fun -> fun)
    const tags = content.match(/#[a-zA-Z0-9_]+/g)?.map(tag => tag.substring(1).toLowerCase()) || [];

    // Step 1: Create the tweet
    const tweet = await this.tweetRepository.create(data);

    // Step 2: If no hashtags, return tweet early
    if (tags.length === 0) {
        return tweet;
    }

    // Step 3: Process existing and new hashtags
    let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
    let titleOfPresentTags = alreadyPresentTags.map(tag => tag.title);

    let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));
    newTags = newTags.map(tag => {
        return { title: tag, tweets: [tweet.id] };
    });

    // Step 4: Create new hashtags
    await this.hashtagRepository.bulkCreate(newTags);

    // Step 5: Update existing hashtags with tweet ID
    alreadyPresentTags.forEach(tag => {
        tag.tweets.push(tweet.id);
        tag.save();
    });

    return tweet;
}

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService;

/*
    this is my #first #tweet . I am really #excited
*/