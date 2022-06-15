import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import { schema } from './schema';

const server = new ApolloServer({
    schema,
    context: createContext
});

server.listen({ host: process.env.HOST || 'localhost', port: null }).then(({ url }) => {
    console.log(`Server ready at: ${url})`);
});

