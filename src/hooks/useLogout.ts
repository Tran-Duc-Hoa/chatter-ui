import { commonFetch } from 'src/utils/fetch';
import { BACKEND_URL } from '../constants/urls';

const useLogout = () => {
  const logout = async () => {
    const res = await commonFetch(`${BACKEND_URL}/auth/logout`, {
      method: 'POST'
    });

    if (!res.ok) {
      throw new Error('Error logging out.');
    }
  };

  return { logout };
};

export { useLogout };
