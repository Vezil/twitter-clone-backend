import faker from '@faker-js/faker';

interface Profile {
    bio: string;
    location: string;
    website: string;
    avatar: string;
    userId: number;
}

async function createProfiles(prisma: any) {
    const users = await prisma.user.findMany();

    for (const user of users) {
        const profile: Profile = {
            bio: faker.lorem.text(),
            location: faker.address.city(),
            website: faker.internet.url(),
            avatar: faker.image.avatar(),
            userId: user.id
        };

        const { id } = await prisma.profile.create({
            data: profile
        });

        console.log(`Created profile with id: ${id}`);
    }
}

export { createProfiles };
