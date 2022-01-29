import { PrismaClient } from '@prisma/client';
import generateUsersData from './seeds/users';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log(`Start seeding ...`);

        for (const user of await generateUsersData) {
            const { id } = await prisma.user.create({
                data: user
            });

            console.log(`Created user with id: ${id}`);
        }

        console.log(`Seeding finished successfully.`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
