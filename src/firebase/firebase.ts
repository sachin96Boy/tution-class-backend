import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase/app'
// import * as serviceAccount from './serviceAccount';
import dotenv from 'dotenv';

dotenv.config();



const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail:`${process.env.FIREBASE_ADMIN_CLIENT_EMAIL}`,
    privateKey:`${process.env.FIREBASE_ADMIN_PRIVATE_KEY}`,
    projectId:`${process.env.FIREBASE_ADMIN_PROJECTID}`
  }),
});
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

var fireStore = firebaseAdmin.firestore();



export default { firebaseAdmin, firebaseApp, fireStore };
