import { objectType } from '@nexus/schema';

export const Comment = objectType({
    name: 'Comment',

    definition(t: any) {
        t.int('id');
        t.string('content');
        t.date('createdAt');
        t.int('userId');
        t.field('user', {
            type: 'User',
            resolve: (parent: any, _: any, context: any) => {
                return context.prisma.user.findUnique({
                    where: { id: parent.userId as number }
                });
            }
        });
        t.int('tweetId');
        t.field('tweet', {
            type: 'Tweet',
            resolve: (parent: any, _: any, context: any) => {
                return context.prisma.tweet.findUnique({
                    where: { id: parent.tweetId as number }
                });
            }
        });
        t.int('commentId');
        t.field('comment', {
            type: 'Comment',
            resolve: (parent: any, _: any, context: any) => {
                return context.prisma.comment.findUnique({
                    where: { id: parent.commentId as number }
                });
            }
        });
    }
});
