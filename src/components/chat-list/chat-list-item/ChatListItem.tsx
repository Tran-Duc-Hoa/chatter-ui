import { ListItemButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { Chat } from 'src/gql/graphql';
import router from 'src/router';

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
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <>
                <Typography sx={{ display: 'inline', mr: 1 }} component='span' variant='body2' color='text.primary'>
                  {chat.latestMessage?.user.username || ''}
                </Typography>
                {chat.latestMessage?.content}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant='inset' />
    </>
  );
};

export default ChatListItem;
