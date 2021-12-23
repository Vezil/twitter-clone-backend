import { intArg, nonNull, objectType, stringArg } from 'nexus';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import { APP_SECRET, getUserId } from '../utils';
import { Context } from '../context';

export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.field('signup', {
            type: 'AuthPayload',
            args: {
                name: stringArg(),
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            resolve: async (_parent, args, context: Context) => {
                const hashedPassword = await hash(args.password, 10);
                const user = await context.prisma.user.create({
                    data: {
                        name: args.name,
                        email: args.email,
                        password: hashedPassword
                    }
                });

                return {
                    token: sign({ userId: user.id }, APP_SECRET),
                    user
                };
            }
        });

        t.field('login', {
            type: 'AuthPayload',
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            resolve: async (_parent, { email, password }, context: Context) => {
                const user = await context.prisma.user.findUnique({
                    where: {
                        email
                    }
                });

                if (!user) {
                    throw new Error(`No user found for email: ${email}`);
                }

                const passwordValid = await compare(password, user.password);

                if (!passwordValid) {
                    throw new Error('Invalid password');
                }

                return {
                    token: sign({ userId: user.id }, APP_SECRET),
                    user
                };
            }
        });

        t.field('createProfile', {
            type: 'Profile',
            args: {
                bio: stringArg(),
                location: stringArg(),
                website: stringArg(),
                avatar: stringArg()
            },
            resolve: async (_parent, args, ctx) => {
                const userId = getUserId(ctx);

                if (!userId) {
                    throw new Error('Could not authenticate user.');
                }

                return ctx.prisma.profile.create({
                    data: {
                        ...args,
                        User: { connect: { id: Number(userId) } }
                    }
                });
            }
        });

        t.field('updateProfile', {
            type: 'Profile',
            args: {
                id: intArg(),
                bio: stringArg(),
                location: stringArg(),
                website: stringArg(),
                avatar: stringArg()
            },
            resolve: async (_parent, { id, ...args }, ctx) => {
                const userId = getUserId(ctx);

                if (!userId) {
                    throw new Error('Could not authenticate user.');
                }

                return ctx.prisma.profile.update({
                    data: {
                        ...args
                    },
                    where: {
                        id: Number(id)
                    }
                });
            }
        });

        t.field('createTweet', {
            type: 'Tweet',
            args: {
                content: nonNull(stringArg())
            },
            resolve: async (_parent, { content }, ctx) => {
                const userId = getUserId(ctx);

                if (!userId) {
                    throw new Error('Could not authenticate user.');
                }

                return ctx.prisma.tweet.create({
                    data: {
                        content,
                        User: { connect: { id: Number(userId) } }
                    }
                });
            }
        });

        t.field('likeTweet', {
            type: 'LikedTweet',
            args: {
                id: intArg()
            },
            resolve: async (_parent, { id }, ctx) => {
                const userId = getUserId(ctx);

                if (!userId) {
                    throw new Error('Could not authenticate user.');
                }

                return ctx.prisma.likedTweet.create({
                    data: {
                        tweet: { connect: { id: Number(id) } },
                        user: { connect: { id: Number(userId) } }
                    }
                });
            }
        });

        t.field('deleteLike', {
            type: 'LikedTweet',
            args: {
                id: nonNull(intArg())
            },
            resolve: async (_parent, { id }, ctx) => {
                const userId = getUserId(ctx);

                if (!userId) {
                    throw new Error('Could not authenticate user.');
                }

                return ctx.prisma.likedTweet.delete({
                    where: { id }
                });
            }
        });

        t.field('createComment', {
            type: 'Comment',
            args: {
                id: nonNull(intArg()),
                content: nonNull(stringArg())
            },
            resolve: async (_parent, { id, content }, context: Context) => {
                const userId = getUserId(context);

                if (!userId) {
                    throw new Error('Could not authenticate user.');
                }

                return context.prisma.comment.create({
                    data: {
                        content,
                        user: { connect: { id: Number(userId) } },
                        tweet: { connect: { id: Number(id) } }
                    }
                });
            }
        });

        t.field('createReply', {
            type: 'Comment',
            args: {
                id: nonNull(intArg()),
                content: nonNull(stringArg()),
                commentId: nonNull(intArg())
            },
            resolve: async (_parent, { id, content, commentId }, context: Context) => {
                const userId = getUserId(context);

                if (!userId) {
                    throw new Error('Could not authenticate user.');
                }

                return context.prisma.comment.create({
                    data: {
                        content,
                        user: { connect: { id: Number(userId) } },
                        tweet: { connect: { id: Number(id) } },
                        comment: { connect: { id: Number(commentId) } }
                    }
                });
            }
        });

        t.field('follow', {
            type: 'Following',
            args: {
                name: nonNull(stringArg()),
                followId: nonNull(intArg()),
                avatar: stringArg()
            },
            resolve: async (_parent, { name, followId, avatar }, context: Context) => {
                const userId = getUserId(context);

                if (!userId) {
                    throw new Error('Could not authenticate user.');
                }

                return context.prisma.following.create({
                    data: {
                        name,
                        followId,
                        avatar,
                        user: { connect: { id: Number(userId) } }
                    }
                });
            }
        });

        t.field('deleteFollow', {
            type: 'Following',
            args: {
                id: nonNull(intArg())
            },
            resolve: async (_parent, { id }, ctx) => {
                const userId = getUserId(ctx);

                if (!userId) {
                    throw new Error('Could not authenticate user.');
                }

                return ctx.prisma.following.delete({
                    where: { id }
                });
            }
        });
    }
});
