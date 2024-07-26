/* eslint-disable @typescript-eslint/no-explicit-any */
const extractErrorMessage = (error: any) => {
  const errorMessage = error.graphQLErrors?.[0]?.extensions?.originalError?.message;

  if (Array.isArray(errorMessage)) {
    return formatErrorMessage(errorMessage[0]);
  }
  return errorMessage;
};

const formatErrorMessage = (error: string) => {
  return error.charAt(0).toUpperCase() + error.slice(1);
};

export { extractErrorMessage };
