import { Box, Divider, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { PAGE_SIZE } from 'src/constants/page-size';
import { Chat } from 'src/gql/graphql';
import { useCountChats } from 'src/hooks/useCountChats';
import { useGetChats } from 'src/hooks/useGetChats';
import { useMessageCreated } from 'src/hooks/useMessageCreated';
import { usePath } from 'src/hooks/usePath';
import ChatListAdd from './chat-list-add/ChatListAdd';
import ChatListHeader from './chat-list-header/ChatListHeader';
import ChatListItem from './chat-list-item/ChatListItem';

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const { data, fetchMore } = useGetChats({ skip: 0, limit: PAGE_SIZE });
  const { path } = usePath();
  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });
  const { chatsCount, countChats } = useCountChats();

  useEffect(() => {
    countChats();
  }, [countChats]);

  const sortChats = (chatA: Chat, chatB: Chat) => {
    if (!chatA.latestMessage) return 1;
    return new Date(chatB.latestMessage?.createdAt).getTime() - new Date(chatA.latestMessage?.createdAt).getTime();
  };

  return (
    <>
      <Stack>
        <ChatListHeader onAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: '80vh', overflow: 'auto' }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchMore({ variables: { skip: data?.chats.length } })}
            hasMore={data?.chats && chatsCount ? data.chats.length < chatsCount : false}
            useWindow={false}
          >
            {data?.chats &&
              [...data.chats]
                .sort(sortChats)
                ?.map((chat) => <ChatListItem key={chat._id} selected={path.includes(chat._id)} chat={chat} />)}
          </InfiniteScroll>
        </Box>
      </Stack>
      <ChatListAdd open={chatListAddVisible} onClose={() => setChatListAddVisible(false)} />
    </>
  );
};

export default ChatList;
