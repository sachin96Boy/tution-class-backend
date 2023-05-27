import admin from 'firebase-admin'


const db = admin.firestore();
const courseCollection = db.collection("Courses");






export default courseCollection;