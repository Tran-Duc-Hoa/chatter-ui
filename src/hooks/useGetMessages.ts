import { useQuery } from '@apollo/client';
import { graphql } from 'src/gql';
import { MessagesQueryVariables } from 'src/gql/graphql';

export const getMessagesDocument = graphql(`
  query Messages($chatId: String!) {
    messages(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessagesDocument, { variables });
};

export { useGetMessages };
