import admin from 'firebase-admin'


const db = admin.firestore();
const teacherCollection = db.collection("Teachers");

export default teacherCollection;