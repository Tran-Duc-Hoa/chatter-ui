import { ApolloCache } from '@apollo/client';
import { Message } from 'src/gql/graphql';
import { getChatsDocument } from 'src/hooks/useGetChats';

export const updateLatestMessage = (cache: ApolloCache<any>, message: Message) => {
  const chats = [...(cache.readQuery({ query: getChatsDocument })?.chats || [])];
  const cachedChatIndex = chats.findIndex((chat) => chat._id === message.chatId);
  if (cachedChatIndex === -1) return;

  const cachedChat = { ...chats[cachedChatIndex] };
  cachedChat.latestMessage = message;
  chats[cachedChatIndex] = cachedChat;

  cache.writeQuery({
    query: getChatsDocument,
    data: {
      chats
    }
  });
};
