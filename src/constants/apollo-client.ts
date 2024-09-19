/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

import { onLogout } from 'src/utils/logout';
import { getToken } from 'src/utils/token';
import excludedRoutes from './excluded-routes';
import { BACKEND_URL, WS_URL } from './urls';

const logoutLink = onError((error) => {
  if (error.graphQLErrors?.length && (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode === 401) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getToken()
    }
  };
});

const httpLink = new HttpLink({ uri: `${BACKEND_URL}/graphql` });
const wsLink = new GraphQLWsLink(
  createClient({
    url: `${WS_URL}/graphql`,
    connectionParams: {
      token: getToken()
    }
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            keyArgs: false,
            merge
          },
          messages: {
            keyArgs: ['chatId'],
            merge
          }
        }
      }
    }
  }),
  link: logoutLink.concat(authLink).concat(splitLink)
});

function merge(existing: any, incoming: any, { args }: any) {
  const merged = existing ? existing.slice(0) : [];
  for (let i = 0; i < incoming.length; i++) {
    merged[args.skip + i] = incoming[i];
  }

  return merged;
}

export default client;
