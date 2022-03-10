import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";


const app = firebase.initializeApp({
  apiKey: "AIzaSyAuiEI0Ebh91_eGtHSOEHsmTM9GtcuwvaQ",
  authDomain: "tournament-38c33.firebaseapp.com",
  databaseURL: "https://tournament-38c33-default-rtdb.firebaseio.com",
  projectId: "tournament-38c33",
  storageBucket: "tournament-38c33.appspot.com",
  messagingSenderId: "186658436946",
  appId: "1:186658436946:web:dcec3c2283afb9d05c2c8b",
  measurementId: "G-CQBRMM4X02"
});

//auth and firestore references
const db = app.firestore();
const functions = app.functions();
const auth = app.auth();

export {auth, db, firebase, functions};