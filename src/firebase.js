import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

 
const app = firebase.initializeApp({
  apiKey: "AIzaSyAHQEAgnb5TXZLssX614Obz9DCkd6lZ9Pc",
  authDomain: "my-kitchen-guide.firebaseapp.com",
  projectId: "my-kitchen-guide",
  storageBucket: "my-kitchen-guide.appspot.com",
  messagingSenderId: "1048247673708",
  appId: "1:1048247673708:web:32d5c79c48768a532c8949",
  measurementId: "G-8CSWKML37H"
});

export const auth = app.auth();
export const database = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default app;
