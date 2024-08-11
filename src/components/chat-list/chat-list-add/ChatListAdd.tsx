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

interface Props {
  open: boolean;
  onClose: () => void;
}

const ChatListAdd = ({ open, onClose }: Props) => {
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title' component='h2' variant='h6'>
        Add Chat
      </DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <Stack spacing={2}>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked value={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />}
              label='Private'
            />
          </FormGroup>
          {isPrivate ? (
            <Paper sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder='Search Users' />
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : (
            <TextField label='Name' />
          )}
          <Button variant='outlined'>Save</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ChatListAdd;
