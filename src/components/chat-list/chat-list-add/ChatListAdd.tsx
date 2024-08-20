import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Switch,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { UNKNOWN_ERROR_MESSAGE } from 'src/constants/errors';
import { useCreateChat } from 'src/hooks/useCreateChat';
import router from 'src/router';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ChatListAdd = ({ open, onClose }: Props) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [createChat] = useCreateChat();

  const handleCreateChat = async () => {
    if (!name && !isPrivate) {
      setError('Chat name is required.');
      return;
    }

    try {
      const chat = await createChat({
        variables: {
          createChatInput: {
            isPrivate,
            name
          }
        }
      });
      handleClose();
      router.navigate(`/chats/${chat.data?.createChat._id}`);
    } catch (error) {
      setError(UNKNOWN_ERROR_MESSAGE);
    }
  };

  const handleClose = () => {
    setName('');
    setIsPrivate(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title' component='h2' variant='h6'>
        Add Chat
      </DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <Stack spacing={2}>
          <FormGroup>
            <FormControlLabel control={<Switch value={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />} label='Private' />
          </FormGroup>
          {isPrivate ? (
            <Paper sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder='Search Users' />
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : (
            <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} error={!!error} helperText={error} />
          )}
          <Button variant='outlined' onClick={handleCreateChat}>
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ChatListAdd;
