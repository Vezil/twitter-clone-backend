import { queryType } from '@nexus/schema';
import { intArg } from 'nexus';
import { getUserId } from '../utils';

export const Query = queryType({
    definition(t) {
        t.field('me', {
            type: 'User',
            resolve: (parent, args, ctx) => {
                const userId = getUserId(ctx);

                return ctx.prisma.user.findUnique({
                    where: {
                        id: Number(userId)
                    }
                });
            }
        });

        t.list.field('users', {
            type: 'User',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.user.findMany();
            }
        });

        t.list.field('tweets', {
            type: 'Tweet',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.tweet.findMany();
            }
        });

        t.field('tweet', {
            type: 'Tweet',
            args: { id: intArg() },
            resolve: (parent, { id }, ctx) => {
                return ctx.prisma.tweet.findUnique({
                    where: {
                        id: Number(id)
                    }
                });
            }
        });

        t.list.field('likedTweet', {
            type: 'LikedTweet',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.likedTweet.findMany();
            }
        });

        t.list.field('comments', {
            type: 'Comment',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.comment.findMany();
            }
        });

        t.field('user', {
            type: 'User',
            args: { id: intArg() },
            resolve: (parent, { id }, ctx) => {
                return ctx.prisma.user.findUnique({
                    where: {
                        id: Number(id)
                    }
                });
            }
        });
    }
});
