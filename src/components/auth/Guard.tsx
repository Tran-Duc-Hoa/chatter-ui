import { ReactNode } from 'react';
import excludedRoutes from '../../constants/excluded-routes';
import { useGetMe } from '../../hooks/useGetMe';

interface Props {
  children: ReactNode;
}

const Guard = ({ children }: Props) => {
  const { data: user } = useGetMe();

  return <>{excludedRoutes.includes(window.location.pathname) ? children : user && children}</>;
};

export default Guard;
