import { getToken } from './token';

export const commonFetch = (input: RequestInfo, init: RequestInit = {}) =>
  fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      authorization: getToken()
    }
  });
