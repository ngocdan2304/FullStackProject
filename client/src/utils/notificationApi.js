import { createClient } from 'graphql-ws';
import Env from "../environments";

const client = createClient({
  url: Env.VITE_GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `subscription PushNotification {
  notification {
    message
  }
}`;


export class NotificationApi {
  static async subscribe({ onNext = () => { }, onError = () => { } }) {
    await new Promise((resolve, reject) => {
      client.subscribe(
        {
          query,
        },
        {
          next: (data) => onNext(data),
          error: (err) => { onError(err); reject(err) },
          complete: resolve,
        }
      );
    })
  }
}