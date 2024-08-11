import AddCircle from '@mui/icons-material/AddCircle';
import { AppBar, IconButton, Toolbar } from '@mui/material';

interface Props {
  onAddChat: () => void;
}

const ChatListHeader = ({ onAddChat }: Props) => {
  return (
    <AppBar position='static' color='transparent'>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={onAddChat}>
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
