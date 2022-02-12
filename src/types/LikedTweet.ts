import { objectType } from '@nexus/schema';

export const LikedTweet = objectType({
    name: 'LikedTweet',

    definition(t: any) {
        t.int('id');
        t.date('likedAt');
        t.int('tweetId');
        t.int('userId');
        t.field('tweet', {
            type: 'Tweet',
            resolve: (parent: any, _: any, context: any) => {
                return context.prisma.tweet.findUnique({
                    where: { id: parent.tweetId as number }
                });
            }
        });
        t.field('user', {
            type: 'User',
            resolve: (parent: any, _: any, context: any) => {
                return context.prisma.user.findUnique({
                    where: { id: parent.userId as number }
                });
            }
        });
    }
});
