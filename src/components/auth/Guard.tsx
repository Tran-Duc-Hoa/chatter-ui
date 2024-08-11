import { ReactNode, useEffect } from 'react';

import { authenticatedVar } from 'src/constants/authenticated';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from 'src/constants/errors';
import excludedRoutes from 'src/constants/excluded-routes';
import { snackVar } from 'src/constants/snack';
import { useGetMe } from 'src/hooks/useGetMe';
import { usePath } from 'src/hooks/usePath';

interface Props {
  children: ReactNode;
}

const Guard = ({ children }: Props) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath();

  useEffect(() => {
    if (user) authenticatedVar(true);
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return <>{excludedRoutes.includes(path) ? children : user && children}</>;
};

export default Guard;
