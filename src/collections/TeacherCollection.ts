import firebaseAcc from "../firebase/importFirebase";

const initializeFirestore = async () => {
  const firebaseInstance = await firebaseAcc();
  const admin = firebaseInstance.firebaseAdmin;
  const db = admin.firestore();
  const teacherCollection = db.collection("Teacher");
  return teacherCollection;
};

export default initializeFirestore;
