let Env = {
  DATABASE_URL: undefined,
  DATABASE_USERNAME: undefined,
  DATABASE_PASSWORD: undefined,
  FIREBASE_API_KEY: undefined,
  FIREBASE_AUTH_DOMAIN: undefined,
  FIREBASE_PROJECT_ID: undefined,
  FIREBASE_STORAGE_BUCKET: undefined,
  FIREBASE_MESSAGING_SENDER_ID: undefined,
  FIREBASE_APP_ID: undefined,
  FIREBASE_MEASURENT_ID: undefined,
  PORT: undefined,
}

Env = process.env;

export default Env;