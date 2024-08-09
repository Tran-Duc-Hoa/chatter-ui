import { useReactiveVar } from '@apollo/client';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { authenticatedVar } from 'src/constants/authenticated';
import Branding from './Branding';
import MobileBranding from './mobile/MobileBranding';
import MobileNavigation from './mobile/MobileNavigation';
import Navigation from './Navigation';
import Settings from './Settings';

const pages = [
  {
    title: 'Home',
    path: '/'
  }
];

const unauthenticatedPages = [
  {
    title: 'Login',
    path: '/login'
  },
  {
    title: 'Sign up',
    path: '/signup'
  }
];

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Branding />
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />
          <MobileNavigation pages={authenticated ? pages : unauthenticatedPages} />
          <MobileBranding />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
