import { graphql } from 'src/gql';

export const ChatFragment = graphql(`
  fragment ChatFragment on Chat {
    _id
    userId
    userIds
    isPrivate
    name
  }
`);
