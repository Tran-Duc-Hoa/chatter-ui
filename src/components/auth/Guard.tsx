import { ReactNode, useEffect } from 'react';

import { authenticatedVar } from 'src/constants/authenticated';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from 'src/constants/errors';
import { snackVar } from 'src/constants/snack';
import excludedRoutes from '../../constants/excluded-routes';
import { useGetMe } from '../../hooks/useGetMe';

interface Props {
  children: ReactNode;
}

const Guard = ({ children }: Props) => {
  const { data: user, error } = useGetMe();

  useEffect(() => {
    if (user) authenticatedVar(true);
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return <>{excludedRoutes.includes(window.location.pathname) ? children : user && children}</>;
};

export default Guard;
