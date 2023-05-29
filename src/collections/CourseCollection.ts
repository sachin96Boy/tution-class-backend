import firebase from "../firebase/firebase";

const admin = firebase.firebaseAdmin;


const db = admin.firestore();
const courseCollection = db.collection("Courses");






export default courseCollection;