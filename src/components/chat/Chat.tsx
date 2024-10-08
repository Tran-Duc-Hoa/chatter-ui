import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Divider, Grid, IconButton, InputBase, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useLocation, useParams } from 'react-router-dom';

import { PAGE_SIZE } from 'src/constants/page-size';
import { useCountMessages } from 'src/hooks/useCountMessages';
import { useCreateMessage } from 'src/hooks/useCreateMessage';
import { useGetChat } from 'src/hooks/useGetChat';
import { useGetMessages } from 'src/hooks/useGetMessages';

const Chat = () => {
  const params = useParams();
  const chatId = params._id || '';
  const [message, setMessage] = useState('');
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  console.log('chatId', chatId);
  const { data: messages, fetchMore } = useGetMessages({ chatId, skip: 0, limit: PAGE_SIZE });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  useEffect(() => {
    if (messages && messages.messages.length <= PAGE_SIZE) {
      setMessage('');
      scrollToBottom();
    }
  }, [location, messages]);

  const scrollToBottom = () => {
    divRef.current?.scrollIntoView();
  };

  const handleCreateMessage = async () => {
    if (!chatId) return;

    await createMessage({
      variables: {
        createMessageInput: {
          content: message,
          chatId
        }
      }
    });

    setMessage('');
    scrollToBottom();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateMessage();
    }
  };

  return (
    <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={0}
          isReverse
          loadMore={() => fetchMore({ variables: { skip: messages?.messages.length, limit: PAGE_SIZE } })}
          hasMore={messages && messagesCount ? messages.messages.length < messagesCount : false}
          useWindow={false}
        >
          {messages &&
            [...messages.messages]
              .sort((msgA, msgB) => new Date(msgA.createdAt).getTime() - new Date(msgB.createdAt).getTime())
              .map((message) => (
                <Grid container alignItems='center' marginBottom='1rem'>
                  <Grid item xs={2} lg={1}>
                    <Stack justifyContent='center' alignItems='center'>
                      <Avatar src={message.user.imageUrl} sx={{ width: 52, height: 52 }} />

                      <Typography variant='caption'>{message.user.username}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} lg={11}>
                    <Stack>
                      <Paper sx={{ width: 'fit-content' }}>
                        <Typography sx={{ padding: '0.9rem' }}>{message.content}</Typography>
                      </Paper>
                      <Typography variant='caption' sx={{ marginLeft: '0.25rem' }}>
                        {dayjs(message.createdAt).format('HH:mm - MM/DD/YYYY')}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
          <div ref={divRef} />
        </InfiniteScroll>
      </Box>
      <Paper sx={{ p: '2px 4px', display: 'flex', justifySelf: 'end', alignItems: 'center', width: '100%', margin: '1rem 0' }}>
        <InputBase
          sx={{ ml: 1, flex: 1, width: '100%' }}
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <IconButton onClick={handleCreateMessage} color='primary' sx={{ p: '10px' }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
