import Env from "../environments";
import { LocalStorage } from "../models/LocalStorage";
import { FireBase } from "./firebase";

const GRAPHQL_SERVER = Env.REACT_APP_GRAPHQL_SERVER;

export const graphQLRequest = async (payload, options = {}) => {
  try {
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: genHeaderApi(options),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      if (res.status === 403) {
        FireBase.signOut();
        return null;
      }
    }

    const { data } = await res.json();
    return data;

  } catch (error) {
    console.error(error)
    return null;
  }
};

const genHeaderApi = (options = {}) => {
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options,
  }
  let token = LocalStorage.getUserToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}