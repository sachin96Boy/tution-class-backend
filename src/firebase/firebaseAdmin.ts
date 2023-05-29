import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import fetchServiceAccount from './serviceAccount';


dotenv.config();

const initializeFirebase = async () => {
  const serviceAccount = await fetchServiceAccount(); // Await the result of fetchServiceAccount

  const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    // Add other Firebase configuration options if required
  });

  const fireStore = firebaseAdmin.firestore();

  return {
    firebaseAdmin,
    fireStore
  };
};

export default initializeFirebase;