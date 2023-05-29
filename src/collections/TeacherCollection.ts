import firebase from "../firebase/firebase";

const admin = firebase.firebaseAdmin;

const db = admin.firestore();
const teacherCollection = db.collection("Teachers");

export default teacherCollection;