interface Following {
    name: string;
    avatar: string;
    followId: number;
    userId: number;
}

async function createFollowings(prisma: any) {
    const users = await prisma.user.findMany({
        include: {
            profile: true
        }
    });

    for (let i = 0; i < 50; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];

        const following: Following = {
            name: randomUser.name,
            avatar: randomUser.profile.avatar,
            followId: randomUser.id, // ?
            userId: randomUser.userId
        };

        const { id } = await prisma.following.create({
            data: following
        });

        console.log(`Created following with id: ${id}`);
    }
}

export { createFollowings };
