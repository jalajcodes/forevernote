import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyDWQpOUW2R3auewGorMBhcJamfGuWEZlvg",
    authDomain: "forevernote-f80da.firebaseapp.com",
    projectId: "forevernote-f80da",
    storageBucket: "forevernote-f80da.appspot.com",
    messagingSenderId: "395114551827",
    appId: "1:395114551827:web:69a6ea5513794d4a5cfde6",
    measurementId: "G-1GLLNC05XP"
});

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { projectFirestore, projectAuth, timestamp };
