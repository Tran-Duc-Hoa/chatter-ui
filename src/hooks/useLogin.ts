import { useState } from 'react';
import client from '../constants/apollo-client';
import { BACKEND_URL } from '../constants/urls';

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState('');

  const login = async (request: LoginRequest) => {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
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
        setError('An unknown error occurred.');
      }
      return;
    }

    setError('');
    await client.refetchQueries({ include: 'active' });
  };

  return { login, error };
};

export { useLogin };
