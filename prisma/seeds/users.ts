import { hash } from 'bcryptjs';
import faker from '@faker-js/faker';

interface User {
    name: string;
    email: string;
    password: string;
}

async function createUsers(prisma: any) {
    for (let i = 0; i < 20; i++) {
        const password = Math.random().toString(36);

        const user: User = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: await hash(password, 10)
        };

        const { id } = await prisma.user.create({
            data: user
        });

        console.log(`Created user with id: ${id}`);
    }
}

export { createUsers };
