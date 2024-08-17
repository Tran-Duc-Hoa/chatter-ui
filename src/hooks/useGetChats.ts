import { useQuery } from '@apollo/client';
import { graphql } from 'src/gql';

export const getChatsDocument = graphql(`
  query Chats {
    chats {
      ...ChatFragment
    }
  }
`);

const useGetChats = () => {
  return useQuery(getChatsDocument);
};

export { useGetChats };
