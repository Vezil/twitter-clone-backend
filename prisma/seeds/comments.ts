import faker from '@faker-js/faker';

interface Comment {
    content: string;
    userId: number;
    tweetId: number;
    commentId: number | null;
}

async function createComments(prisma: any) {
    const users = await prisma.user.findMany();
    const tweets = await prisma.tweet.findMany();

    for (const user of users) {
        const randomTweet = tweets[Math.floor(Math.random() * tweets.length)];

        const comment: Comment = {
            content: faker.lorem.text(),
            userId: user.id,
            tweetId: randomTweet.id,
            commentId: null
        };

        const { id } = await prisma.comment.create({
            data: comment
        });

        console.log(`Created comment with id: ${id}`);
    }
}

export { createComments };
