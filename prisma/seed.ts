import { PrismaClient } from '@prisma/client';
import { createUsers } from './seeds/users';
import { createProfiles } from './seeds/profiles';
import { createTweets } from './seeds/tweets';
import { createComments } from './seeds/comments';
import { createLikedTweets } from './seeds/liked-tweets';
import { createFollowings } from './seeds/followings';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log(`Start seeding ...`);

        // transaction?

        await createUsers(prisma);

        await createProfiles(prisma);

        await createTweets(prisma);

        await createComments(prisma);

        await createLikedTweets(prisma);

        await createFollowings(prisma);

        console.log(`Seeding finished successfully.`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
