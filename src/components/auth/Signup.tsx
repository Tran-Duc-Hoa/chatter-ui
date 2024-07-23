import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import Auth from './Auth';

const SignUp = () => {
  return (
    <Auth submitLabel='Sign up' onSubmit={async () => {}}>
      <Link to='/login' style={{ alignSelf: 'center' }}>
        <MuiLink>Login</MuiLink>
      </Link>
    </Auth>
  );
};

export default SignUp;
