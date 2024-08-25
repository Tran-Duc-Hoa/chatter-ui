import { Button, Stack, TextField } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMe } from '../../hooks/useGetMe';

interface Props {
  children: ReactNode;
  submitLabel: string;
  error?: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
}

const Auth = ({ children, submitLabel, onSubmit, error }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: user } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Stack spacing={3} sx={{ height: '100vh', maxWidth: '360px', margin: '0 auto', justifyContent: 'center' }}>
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
