import { graphql } from 'src/gql';

export const UserFragment = graphql(`
  fragment UserFragment on User {
    _id
    email
    username
    imageUrl
  }
`);
