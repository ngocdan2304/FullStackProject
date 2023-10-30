import { graphQLRequest } from './api';

export const registerUser = async ({ uid, name }) => {
  const query = `mutation Register($uid: String!, $name: String!) {
    register(uid: $uid, name: $name) {
      name
      uid
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: {
      uid: uid,
      name: name
    },
  });
  console.log({ data }, "registerUser")
  return data;
};
