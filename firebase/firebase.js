import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyBU9jHAeE11OAkqUtet3LLl95YGCqrTKdQ",
    authDomain: "signal-clone-83be0.firebaseapp.com",
    projectId: "signal-clone-83be0",
    storageBucket: "signal-clone-83be0.appspot.com",
    messagingSenderId: "551668786043",
    appId: "1:551668786043:web:5b832a5d3c7fb4f414d3de"
};
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}
const db = app.firestore();
const storage = firebase.storage()
const auth = firebase.auth();
export { db, auth, storage };