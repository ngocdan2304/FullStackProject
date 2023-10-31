import { createClient } from 'graphql-ws';
import Env from "../environments";

const client = createClient({
  url: Env.VITE_GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `subscription ReciveNotification {
  notification {
    message
  }
}`;


export class NotificationApi {
  static async subscribe() {
    console.log("VITE_GRAPHQL_SUBSCRIPTION_ENDPOINT", Env.VITE_GRAPHQL_SUBSCRIPTION_ENDPOINT)
    return await new Promise((resolve, reject) => {
      client.subscribe(
        {
          query,
        },
        {
          next: (data) => { result = data },
          error: reject,
          complete: () => resolve(result),
        }
      );
    })
  }
}