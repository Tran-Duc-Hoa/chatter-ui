import { useMutation } from '@apollo/client';
import { updateLatestMessage } from 'src/cache/latest-mesage';
import { updateMessages } from 'src/cache/messages';
import { graphql } from 'src/gql';

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = () => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage);
        updateLatestMessage(cache, data.createMessage);
      }
    }
  });
};

export { useCreateMessage };
