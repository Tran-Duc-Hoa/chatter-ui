import { ListItemButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { Chat } from 'src/gql/graphql';
import router from 'src/router';
import './chat-list-item.css';

interface Props {
  chat: Chat;
  selected: boolean;
}

const ChatListItem = ({ chat, selected }: Props) => {
  return (
    <>
      <ListItem alignItems='flex-start' disablePadding>
        <ListItemButton selected={selected} onClick={() => router.navigate(`/chats/${chat._id}`)}>
          <ListItemAvatar>
            <Avatar alt='Remy Sharp' src={chat.latestMessage?.user.imageUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                <Typography sx={{ display: 'inline', mr: 1 }} component='span' variant='body2' color='text.primary'>
                  {chat.latestMessage?.user.username || ''}
                </Typography>
                <div className='content'>{chat.latestMessage?.content}</div>
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant='inset' />
    </>
  );
};

export default ChatListItem;
