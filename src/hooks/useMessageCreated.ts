import { useSubscription } from '@apollo/client';
import { updateLatestMessage } from 'src/cache/latest-mesage';
import { updateMessages } from 'src/cache/messages';
import { graphql } from 'src/gql';
import { SubscriptionMessageCreatedArgs } from 'src/gql/graphql';

const messageCreatedDocument = graphql(`
  subscription MessageCreated($chatIds: [String!]!) {
    messageCreated(chatIds: $chatIds) {
      ...MessageFragment
    }
  }
`);

export const useMessageCreated = (variables: SubscriptionMessageCreatedArgs) => {
  return useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateMessages(client.cache, data.data.messageCreated);
        updateLatestMessage(client.cache, data.data.messageCreated);
      }
    }
  });
};
