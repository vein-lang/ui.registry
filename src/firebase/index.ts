import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup, User, setPersistence, browserSessionPersistence, Auth } from "firebase/auth";

import Vue from "vue";
import router from '../router';

import {  } from "vue-property-decorator";

const firebaseConfig = {
  apiKey: "AIzaSyBl-PQJHWdbjoa1uMvf0CTlqWS8bi4YVSc",
  authDomain: "vein-lang.firebaseapp.com",
  projectId: "vein-lang",
  storageBucket: "vein-lang.appspot.com",
  messagingSenderId: "372190612725",
  appId: "1:372190612725:web:e8175ed62c0d12f9f289bc",
  measurementId: "G-X7CWS36S6N"
};

import state, { Keys } from "@/state";

export class FirebaseAuth {
  public auth!: Auth;

  fbase: FirebaseApp | null = null;
  beforeInstall() {
    this.fbase = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.hook();
    console.log("Firebase (beforeInstall)");
  }

  install(vue: typeof Vue, options?: any) {
    vue.prototype.$auth = this;
    console.log("Firebase (install)");
  }

  hook() {
    this.auth.onAuthStateChanged((user: User | null) => {
      state.commit(Keys.SET_USER, user);
      console.log("Firebase (onAuthStateChanged)");
    });
  }

  getUser() {
    return getAuth().currentUser;
  }

  async login(redirectTarget: string = "/") {
    console.log("Firebase (login)");
    const provider = new GithubAuthProvider();
    provider.addScope('repo');
    return new Promise((resolve, reject) => {
      setPersistence(this.auth!, browserSessionPersistence)
        .then(() => {
          return signInWithPopup(this.auth!, provider)
            .then((result) => {
              const credential = GithubAuthProvider.credentialFromResult(result);
              state.commit(Keys.SET_USER, result.user);
              state.commit(Keys.SET_TOKEN, result.user);
              router.push(redirectTarget);
              resolve(true);
            }).catch((error) => {
              console.error(error.code, error.message);
              state.commit(Keys.SET_ERROR, error.message);
              resolve(false);
            });
        }).catch(error => reject(error));
    });
  }

  public async logout() {
    return await this.auth!.signOut();
  }
}

export const firebaseInstance = new FirebaseAuth();

export default {
  beforeInstall: () => {
    firebaseInstance.beforeInstall();
  },
  plugin: {
    install: (vue: typeof Vue, options?: any) => {
      firebaseInstance.install(vue, options);
    }
  }
}
