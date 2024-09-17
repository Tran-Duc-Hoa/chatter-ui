import client from 'src/constants/apollo-client';
import { authenticatedVar } from 'src/constants/authenticated';
import router from 'src/router';
import { clearToken } from './token';

export const onLogout = () => {
  authenticatedVar(false);
  clearToken();
  router.navigate('/login');
  client.resetStore();
};
