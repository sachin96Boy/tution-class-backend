import firebase from '../firebase/firebase';

const db = firebase.fireStore;

const TeacherCollection = db.collection("Teachers");

export default TeacherCollection;