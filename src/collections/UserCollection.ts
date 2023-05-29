import * as admin from 'firebase-admin';


const db = admin.firestore();
const userCollection = db?.collection("Users");

export default userCollection