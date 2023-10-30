import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Env from "../environments";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { LocalStorage } from "../models/LocalStorage";

export class FireBase {
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
      apiKey: Env.REACT_APP_FIREBASE_API_KEY,
      authDomain: Env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: Env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: Env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: Env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: Env.REACT_APP_FIREBASE_APP_ID,
      measurentId: Env.REACT_APP_FIREBASE_MEASURENT_ID

    };
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
    this.setHasFirebase(true);
  }

  static getAuth() {
    this.setUpFirebase();
    return getAuth();
  }

  static getCurrentUser() {
    let currentUser = this.getAuth().currentUser;
    return currentUser;
  }

  static async signInWithPopup(onSuccess = () => { }) {
    let auth = this.getAuth();
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const res = await signInWithPopup(auth, provider);
      console.log({ res, }, "res")
      typeof onSuccess === "function" && onSuccess(res);
    } catch (error) {
      if (!auth?.uid) {
        this.signOut();
      }
    }
  }

  static onIdTokenChanged(callback = () => { }) {
    return this.getAuth().onIdTokenChanged((user) => {
      typeof callback === "function" && callback(user);
    })
  }

  static onAuthStateChanged(callback = () => { }) {
    return this.getAuth().onAuthStateChanged((user) => {
      typeof callback === "function" && callback(user);
    })
  }

  static signOut() {
    this.getAuth().signOut();
    LocalStorage.setLoginInfo();
  }
}
