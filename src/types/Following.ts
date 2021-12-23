import { objectType } from '@nexus/schema';

export const Following = objectType({
    name: 'Following',

    definition(t) {
        t.int('id');
        t.string('name');
        t.string('avatar');
        t.int('userId');
        t.field('user', {
            type: 'User',
            resolve: (parent, _, context) => {
                return context.prisma.user.findUnique({
                    where: { id: parent.userId as number }
                });
            }
        });
        t.int('followId');
    }
});
