import { ApolloCache } from '@apollo/client';
import { PAGE_SIZE } from 'src/constants/page-size';
import { Message } from 'src/gql/graphql';
import { getMessagesDocument } from 'src/hooks/useGetMessages';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const messagesQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId,
      skip: 0,
      limit: PAGE_SIZE
    }
  };

  const messages = cache.readQuery(messagesQueryOptions);
  cache.writeQuery({
    ...messagesQueryOptions,
    data: {
      messages: (messages?.messages || []).concat(message)
    }
  });
};
