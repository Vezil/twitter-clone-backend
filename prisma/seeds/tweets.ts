import faker from '@faker-js/faker';

interface Tweet {
    content: string;
    authorId: number;
}

async function createTweets(prisma: any) {
    const users = await prisma.user.findMany();

    for (const user of users) {
        const tweet: Tweet = {
            content: faker.lorem.text(),
            authorId: user.id
        };

        const { id } = await prisma.tweet.create({
            data: tweet
        });

        console.log(`Created tweet with id: ${id}`);
    }
}

export { createTweets };
