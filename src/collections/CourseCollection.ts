import firebaseAcc from "../firebase/importFirebase";

const initializeFirestore = async () => {
  const firebaseInstance = await firebaseAcc();
  const admin = firebaseInstance.firebaseAdmin;
  const db = admin.firestore();
  const courseCollection = db.collection("Course");
  return courseCollection;
};

export default initializeFirestore;
