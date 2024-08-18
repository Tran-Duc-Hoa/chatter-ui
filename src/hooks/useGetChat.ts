import { useQuery } from '@apollo/client';
import { graphql } from 'src/gql';
import { ChatQueryVariables } from 'src/gql/graphql';

export const getChatDocument = graphql(`
  query Chat($_id: String!) {
    chat(_id: $_id) {
      ...ChatFragment
    }
  }
`);

const useGetChat = (variables: ChatQueryVariables) => {
  return useQuery(getChatDocument, { variables });
};

export { useGetChat };
