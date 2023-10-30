import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import Env from "../environments/index.js";

export class FireBaseAdmin {
  static _hasFirebase;

  static getHasFirebase() {
    return this._hasFirebase;
  }
  static setHasFirebase(value) {
    this._hasFirebase = value;
  }

  static setUpFirebase() {
    if (this.getHasFirebase()) return;
    const firebaseConfig = {
      apiKey: Env.FIREBASE_API_KEY,
      authDomain: Env.FIREBASE_AUTH_DOMAIN,
      projectId: Env.FIREBASE_PROJECT_ID,
      storageBucket: Env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: Env.FIREBASE_MESSAGING_SENDER_ID,
      appId: Env.FIREBASE_APP_ID,
      measurentId: Env.FIREBASE_MEASURENT_ID

    };
    initializeApp(firebaseConfig);
    this.setHasFirebase(true);
  }

  static getAuth() {
    this.setUpFirebase();
    return getAuth();
  }

  static onIdTokenChanged(callback = () => { }) {
    return this.getAuth().onIdTokenChanged((user) => {
      typeof callback === "function" && callback(user);
    })
  }
}
