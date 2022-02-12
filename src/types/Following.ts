import { objectType } from '@nexus/schema';

export const Following = objectType({
    name: 'Following',

    definition(t: any) {
        t.int('id');
        t.string('name');
        t.string('avatar');
        t.int('userId');
        t.field('user', {
            type: 'User',
            resolve: (parent: any, _: any, context: any) => {
                return context.prisma.user.findUnique({
                    where: { id: parent.userId as number }
                });
            }
        });
        t.int('followId');
    }
});
