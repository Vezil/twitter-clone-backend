import faker from '@faker-js/faker';

interface LikedTweet {
    likedAt: Date;
    userId: number;
    tweetId: number;
}

async function createLikedTweets(prisma: any) {
    const users = await prisma.user.findMany();
    const tweets = await prisma.tweet.findMany();

    for (let i = 0; i < 50; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomTweet = tweets[Math.floor(Math.random() * tweets.length)];

        const likedTweet: LikedTweet = {
            likedAt: faker.datatype.datetime(),
            userId: randomUser.id,
            tweetId: randomTweet.id
        };

        const { id } = await prisma.likedTweet.create({
            data: likedTweet
        });

        console.log(`Created likedTweet with id: ${id}`);
    }
}

export { createLikedTweets };
