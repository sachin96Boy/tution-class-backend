import * as admin from 'firebase-admin';

import dotenv from 'dotenv';


import * as fetchServiceAccount from './serviceAccount';
import { initializeApp } from 'firebase/app';

dotenv.config();

const serviceAccount =
  async () => {

    return fetchServiceAccount.default;
  }

const firebaseConfig: object = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);
console.log(serviceAccount);
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  // Add other Firebase configuration options if required
});

const fireStore = firebaseAdmin.firestore();

export default {
  firebaseAdmin,
  firebaseApp,
  fireStore
};
