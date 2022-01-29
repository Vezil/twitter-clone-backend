import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import faker from '@faker-js/faker';

async function generateUsersData() {
    const usersData = [];

    for (let i = 0; i < 20; i++) {
        const name = faker.name.findName();
        const email = faker.internet.email();
        const password = Math.random().toString(36);
        const hashedPassword = await hash(password, 10);

        usersData.push({ name, email, password: hashedPassword });
    }

    return usersData as Prisma.UserCreateInput[];
}

export default generateUsersData();
