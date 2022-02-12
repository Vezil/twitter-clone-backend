import { objectType } from '@nexus/schema';

export const Tweet = objectType({
    name: 'Tweet',

    definition(t: any) {
        t.int('id');
        t.string('content');
        t.date('createdAt');
        t.int('authorId');
        t.field('author', {
            type: 'User',
            resolve: (parent: any, _: any, context: any) => {
                return context.prisma.user.findUnique({
                    where: { id: parent.authorId as number },
                    include: { profile: true }
                });
            }
        });
        t.list.field('likes', {
            type: 'LikedTweet',
            resolve: (parent: any, args: any, ctx: any) => {
                return ctx.prisma.likedTweet.findMany({ where: { tweetId: parent.id } });
            }
        });
        t.list.field('comments', {
            type: 'Comment',
            resolve: (parent: any, args: any, ctx: any) => {
                return ctx.prisma.comment.findMany({ where: { tweetId: parent.id } });
            }
        });
    }
});
