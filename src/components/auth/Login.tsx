import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

import { useLogin } from '../../hooks/useLogin';
import Auth from './Auth';

const Login = () => {
  const { error, login } = useLogin();

  return (
    <Auth submitLabel='Login' onSubmit={(request) => login(request)} error={error}>
      <Link to='/signup' style={{ alignSelf: 'center' }}>
        <MuiLink>Sign up</MuiLink>
      </Link>
    </Auth>
  );
};

export default Login;
