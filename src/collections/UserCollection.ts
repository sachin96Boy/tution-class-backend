import firebase from "../firebase/firebase";

const admin = firebase.firebaseAdmin;


const db = admin.firestore();
const userCollection = db?.collection("Users");

export default userCollection