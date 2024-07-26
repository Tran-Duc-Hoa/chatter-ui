import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`;

interface CreateUserInput {
  createUserInput: {
    email: string;
    password: string;
  };
}

const useCreateUser = () => {
  return useMutation<CreateUserInput>(CREATE_USER);
};

export default useCreateUser;
