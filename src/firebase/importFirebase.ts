import firebase from "./firebase";
import initializeFirebase from "./firebaseAdmin";
import admin from 'firebase-admin';

const firebaseAcc = async () => {
    const firebaseApp = firebase().firebaseApp;
    if(admin.apps.length === 0){

        const firebase = await initializeFirebase();
        const firebaseAdmin = firebase.firebaseAdmin;
        const fireStore = firebase.fireStore;
    
        return{
            firebaseAdmin,
            firebaseApp,
            fireStore
        }
    }
    const firebaseAdmin = admin.app();
    const fireStore = admin.app().firestore();

    return{
        firebaseAdmin,
        firebaseApp,
        fireStore
    }
}

export default firebaseAcc