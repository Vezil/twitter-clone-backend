import { makeSchema, objectType, inputObjectType, asNexusMethod, enumType } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import { User, Profile, Tweet, Mutation, LikedTweet, Comment, Following, Query } from './types';
// import { applyMiddleware } from 'graphql-middleware';
// import { permissions } from './permissions';

export const DateTime = asNexusMethod(DateTimeResolver, 'date');

const SortOrder = enumType({
    name: 'SortOrder',
    members: ['asc', 'desc']
});

const UserUniqueInput = inputObjectType({
    name: 'UserUniqueInput',
    definition(t) {
        t.int('id');
        t.string('email');
    }
});

const UserCreateInput = inputObjectType({
    name: 'UserCreateInput',
    definition(t) {
        t.nonNull.string('email');
        t.string('name');
    }
});

const AuthPayload = objectType({
    name: 'AuthPayload',
    definition(t) {
        t.string('token');
        t.field('user', { type: 'User' });
    }
});

export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        User,
        Profile,
        Tweet,
        LikedTweet,
        Comment,
        Following,
        AuthPayload,
        UserUniqueInput,
        UserCreateInput,
        SortOrder,
        DateTime
    ],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts'
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context'
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma'
            }
        ]
    }
});

// export const schema = applyMiddleware(schemaWithoutPermissions, permissions);
