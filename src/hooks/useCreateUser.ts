import { useMutation } from '@apollo/client';
import { graphql } from 'src/gql';

const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`);

const useCreateUser = () => {
  return useMutation(createUserDocument);
};

export default useCreateUser;
