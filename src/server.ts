import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import { schema } from './schema';

const server = new ApolloServer({
    schema,
    context: createContext
});

server.listen({ port: process.env.PORT || 4000, host: process.env.HOST || 'localhost' }).then(({ url }) => {
    console.log(`Server ready at: ${url})`);
});
