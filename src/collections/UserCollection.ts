import firebaseAcc from "../firebase/importFirebase";

const initializeUserCollection = async () => {
  const firebaseInstance = await firebaseAcc();
  const admin = firebaseInstance.firebaseAdmin;
  const db = admin.firestore();
  const userCollection = db.collection("Users");
  return {userCollection};
};

export default initializeUserCollection;
