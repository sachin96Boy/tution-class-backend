import * as admin from 'firebase-admin';

import fetchServiceAccount from './serviceAccount';


async function InitializeFirebaseAdmin() {
  try {
    const serviceAccount = await fetchServiceAccount();

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      // Add other Firebase configuration options if required
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
}

export default InitializeFirebaseAdmin;