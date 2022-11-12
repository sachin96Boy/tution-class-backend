import firebase from "../firebase/firebase";

const db = firebase.fireStore

const UserModal = db.collection("Users")

export default UserModal