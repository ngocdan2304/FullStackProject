let Env = {
  VITE_GRAPHQL_SERVER: undefined,
  VITE_FIREBASE_API_KEY: undefined,
  VITE_FIREBASE_AUTH_DOMAIN: undefined,
  VITE_FIREBASE_PROJECT_ID: undefined,
  VITE_FIREBASE_STORAGE_BUCKET: undefined,
  VITE_FIREBASE_MESSAGING_SENDER_ID: undefined,
  VITE_FIREBASE_APP_ID: undefined,
  VITE_FIREBASE_MEASURENT_ID: undefined,
  VITE_GRAPHQL_SUBSCRIPTION_ENDPOINT: undefined,
}

Env = import.meta.env;

export default Env;