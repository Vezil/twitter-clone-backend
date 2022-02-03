import { PrismaClient } from '@prisma/client';
import { createUsers } from './seeds/users';
import { createProfiles } from './seeds/profiles';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log(`Start seeding ...`);

        await createUsers(prisma);

        await createProfiles(prisma);

        console.log(`Seeding finished successfully.`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
