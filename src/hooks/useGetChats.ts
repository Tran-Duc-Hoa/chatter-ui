import { useQuery } from '@apollo/client';
import { graphql } from 'src/gql';
import { QueryChatsArgs } from 'src/gql/graphql';

export const getChatsDocument = graphql(`
  query Chats($skip: Int!, $limit: Int!) {
    chats(skip: $skip, limit: $limit) {
      ...ChatFragment
    }
  }
`);

const useGetChats = (variables: QueryChatsArgs) => {
  return useQuery(getChatsDocument, { variables });
};

export { useGetChats };
