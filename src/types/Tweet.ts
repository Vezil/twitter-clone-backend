import { objectType } from '@nexus/schema';

export const Tweet = objectType({
    name: 'Tweet',

    definition(t) {
        t.int('id');
        t.string('content');
        t.date('createdAt');
        t.int('authorId');
        t.field('author', {
            type: 'User',
            resolve: (parent, _, context) => {
                return context.prisma.user.findUnique({
                    where: { id: parent.authorId as number },
                    include: { profile: true }
                });
            }
        });
        t.list.field('likes', {
            type: 'LikedTweet',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.likedTweet.findMany({ where: { tweetId: parent.id } });
            }
        });
        t.list.field('comments', {
            type: 'Comment',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.comment.findMany({ where: { tweetId: parent.id } });
            }
        });
    }
});
