import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDH9f4n5IfnzpJMW2EYPwNH9hTFDUrkf14",
    authDomain: "gallang-development.firebaseapp.com",
    databaseURL: "https://gallang-development-default-rtdb.firebaseio.com",
    projectId: "gallang-development",
    storageBucket: "gallang-development.appspot.com",
    messagingSenderId: "1090852358072",
    appId: "1:1090852358072:web:568eacb15b8d256bb7314d",
});

const firestore = app.firestore();
export const myDatabase = {
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    formatDoc: (doc) => {
        return { id: doc.id, ...doc.data() };
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage = app.storage();
export const auth = app.auth();
export default app;
