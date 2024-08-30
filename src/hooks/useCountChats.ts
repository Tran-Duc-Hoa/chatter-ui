import { useCallback, useState } from 'react';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from 'src/constants/errors';
import { snackVar } from 'src/constants/snack';
import { BACKEND_URL } from 'src/constants/urls';

const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState<number | undefined>();

  const countChats = useCallback(async () => {
    const res = await fetch(`${BACKEND_URL}/chats/count`);
    if (!res.ok) return snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    setChatsCount(parseInt(await res.text()));
  }, []);

  return { chatsCount, countChats };
};

export { useCountChats };
