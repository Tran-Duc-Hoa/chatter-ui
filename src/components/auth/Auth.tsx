import { Button, Stack, TextField } from '@mui/material';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
  submitLabel: string;
  error?: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
}

const Auth = ({ children, submitLabel, onSubmit, error }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Stack spacing={3} sx={{ height: '100vh', maxWidth: { xs: '70%', md: '50%' }, margin: '0 auto', justifyContent: 'center' }}>
      <TextField type='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} error={!!error} />
      <TextField
        type='password'
        label='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button variant='contained' onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
