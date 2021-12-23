import { objectType } from '@nexus/schema';

export const User = objectType({
    name: 'User',

    definition(t) {
        t.int('id');
        t.string('name');
        t.string('email');
        t.list.field('tweets', { type: 'Tweet' });
        t.field('profile', {
            type: 'Profile',
            resolve: (parent, _, context) => {
                return context.prisma.user
                    .findUnique({
                        where: { id: parent.id as number }
                    })
                    .profile();
            }
        });
        t.list.field('likedTweets', {
            type: 'LikedTweet',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.likedTweet.findMany({
                    where: { userId: parent.id as number },
                    include: { tweet: true }
                });
            }
        });
        t.list.field('comments', {
            type: 'Comment',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.comment.findMany({
                    where: { userId: parent.id as number }
                });
            }
        });
        t.list.field('followingUsers', {
            type: 'Following',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.following.findMany({
                    where: { userId: parent.id as number }
                });
            }
        });
    }
});
