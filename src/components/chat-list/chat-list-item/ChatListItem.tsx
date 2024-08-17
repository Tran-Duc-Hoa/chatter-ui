import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface Props {
  name?: string;
}

const ChatListItem = ({ name }: Props) => {
  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <>
              <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  );
};

export default ChatListItem;
