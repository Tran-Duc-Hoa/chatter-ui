import { useCallback, useState } from 'react';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from 'src/constants/errors';
import { snackVar } from 'src/constants/snack';
import { BACKEND_URL } from 'src/constants/urls';

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await fetch(`${BACKEND_URL}/messages/count?chatId=${chatId}`);
    if (!res.ok) return snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);

    const { messages } = await res.json();
    setMessagesCount(messages);
  }, [chatId]);

  return { messagesCount, countMessages };
};

export { useCountMessages };
