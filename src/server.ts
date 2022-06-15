import { ApolloServer } from 'apollo-server';
import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { createContext } from './context';
import { schema } from './schema';


const server = new ApolloServer({
    schema,
    context: createContext,
    plugins: [
        process.env.NODE_ENV === 'production' ?
            ApolloServerPluginLandingPageProductionDefault({ footer: false }) :
            ApolloServerPluginLandingPageLocalDefault({ footer: false })
    ]
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server ready at: ${url})`);
});
