import { createClient } from 'graphql-ws';
import Env from "../environments";

const client = createClient({
  url: Env.REACT_APP_GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `subscription ReciveNotification {
  notification {
    message
  }
}`;


export class NotificationApi {
  static async subscribe({ onSuccess = () => { }, onError = () => { } }) {
    await new Promise((resolve, reject) => {
      client.subscribe(
        {
          query,
        },
        {
          next: (data) => { typeof onSuccess === "function" && onSuccess(data) },
          error: reject,
          complete: resolve,
        }
      );
    })
  }
}