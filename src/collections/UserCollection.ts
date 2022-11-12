import firebase from "../firebase/firebase";

const db = firebase.fireStore

const UserCollection = db.collection("Users")

export default UserCollection