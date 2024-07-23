import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import useCreateUser from '../../hooks/useCreateUser';
import Auth from './Auth';

const SignUp = () => {
  const [createUser] = useCreateUser();

  return (
    <Auth
      submitLabel='Sign up'
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password
            }
          }
        });
      }}
    >
      <Link to='/login' style={{ alignSelf: 'center' }}>
        <MuiLink>Login</MuiLink>
      </Link>
    </Auth>
  );
};

export default SignUp;
