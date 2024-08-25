import { ApolloCache } from '@apollo/client';
import { Message } from 'src/gql/graphql';
import { getMessagesDocument } from 'src/hooks/useGetMessages';

export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const messagesQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId
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
