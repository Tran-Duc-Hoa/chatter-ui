import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BACKEND_URL } from './urls';

console.log('BACKEND_URL', BACKEND_URL);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${BACKEND_URL}/graphql`
});

export default client;
