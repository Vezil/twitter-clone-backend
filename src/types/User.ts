import { objectType } from '@nexus/schema';

export const User = objectType({
    name: 'User',

    definition(t: any) {
        t.int('id');
        t.string('name');
        t.string('email');
        t.list.field('tweets', { type: 'Tweet' });
        t.field('profile', {
            type: 'Profile',
            resolve: (parent: any, _: any, context: any) => {
                return context.prisma.user
                    .findUnique({
                        where: { id: parent.id as number }
                    })
                    .profile();
            }
        });
        t.list.field('likedTweets', {
            type: 'LikedTweet',
            resolve: (parent: any, args: any, ctx: any) => {
                return ctx.prisma.likedTweet.findMany({
                    where: { userId: parent.id as number },
                    include: { tweet: true }
                });
            }
        });
        t.list.field('comments', {
            type: 'Comment',
            resolve: (parent: any, args: any, ctx: any) => {
                return ctx.prisma.comment.findMany({
                    where: { userId: parent.id as number }
                });
            }
        });
        t.list.field('followingUsers', {
            type: 'Following',
            resolve: (parent: any, args: any, ctx: any) => {
                return ctx.prisma.following.findMany({
                    where: { userId: parent.id as number }
                });
            }
        });
    }
});
