import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Env from "../environments";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { LocalStorage } from "../models/LocalStorage";
import { registerUser } from "./authApi";

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
      apiKey: Env.VITE_FIREBASE_API_KEY,
      authDomain: Env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: Env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: Env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: Env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: Env.VITE_FIREBASE_APP_ID,
      measurentId: Env.VITE_FIREBASE_MEASURENT_ID

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

  static signInWithPopup(callback = () => { }) {
    let auth = this.getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    signInWithPopup(auth, provider)
      .then((res) => {
        if (res?.user) {
          const { user: { uid, displayName } } = res;
          registerUser({
            uid,
            name: displayName
          })
          typeof callback === "function" && callback();
        }
      })
      .catch(() => {
        if (!auth?.uid) {
          this.signOut();
        }
      })
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
