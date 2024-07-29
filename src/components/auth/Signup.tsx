import { Link as MuiLink } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCreateUser from '../../hooks/useCreateUser';
import { useLogin } from '../../hooks/useLogin';
import { extractErrorMessage } from '../../utils/errors';
import Auth from './Auth';

const SignUp = () => {
  const [error, setError] = useState('');
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
                password
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
          setError('An unknown error occurred.');
        }
      }}
      error={error}
    >
      <Link to='/login' style={{ alignSelf: 'center' }}>
        <MuiLink>Login</MuiLink>
      </Link>
    </Auth>
  );
};

export default SignUp;
