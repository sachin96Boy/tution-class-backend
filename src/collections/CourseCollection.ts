import firebase from '../firebase/firebase';

const db = firebase.fireStore;

const CourseCollection = db.collection("Courses");

export default CourseCollection;