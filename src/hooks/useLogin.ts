import { useState } from 'react';
import { UNKNOWN_ERROR_MESSAGE } from 'src/constants/errors';
import { commonFetch } from 'src/utils/fetch';
import { setToken } from 'src/utils/token';
import client from '../constants/apollo-client';
import { BACKEND_URL } from '../constants/urls';

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState('');

  const login = async (request: LoginRequest) => {
    const res = await commonFetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!res.ok) {
      if (res.status === 401) {
        setError('Credentials are invalid.');
      } else {
        setError(UNKNOWN_ERROR_MESSAGE);
      }
      return;
    }
    setToken(await res.text());

    setError('');
    await client.refetchQueries({ include: 'active' });
  };

  return { login, error };
};

export { useLogin };
