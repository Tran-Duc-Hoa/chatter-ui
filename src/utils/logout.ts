import client from 'src/constants/apollo-client';
import { authenticatedVar } from 'src/constants/authenticated';
import router from 'src/router';

export const onLogout = () => {
  authenticatedVar(false);
  router.navigate('/login');
  client.resetStore();
};
