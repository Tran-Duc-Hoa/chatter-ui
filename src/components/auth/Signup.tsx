import { Link as MuiLink, TextField } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UNKNOWN_ERROR_MESSAGE } from 'src/constants/errors';
import useCreateUser from '../../hooks/useCreateUser';
import { useLogin } from '../../hooks/useLogin';
import { extractErrorMessage } from '../../utils/errors';
import Auth from './Auth';

const SignUp = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [createUser] = useCreateUser();
  const { login } = useLogin();

  return (
    <Auth
      submitLabel='Sign up'
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
                username
              }
            }
          });
          await login({ email, password });
          setError('');
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
      error={error}
      extraFields={[
        <TextField type='text' label='Username' value={username} onChange={(e) => setUsername(e.target.value)} error={!!error} />
      ]}
    >
      <Link to='/login' style={{ alignSelf: 'center' }}>
        <MuiLink>Login</MuiLink>
      </Link>
    </Auth>
  );
};

export default SignUp;
