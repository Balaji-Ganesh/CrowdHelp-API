const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  // NOTE: this is of experiment one. Once succeeds, will be switched to real one.
  apiKey: "AIzaSyCqkXQ1RXsNc4h1o-crilJ4kyk-kP2sELY",
  authDomain: "fir-experiments-16493.firebaseapp.com",
  projectId: "fir-experiments-16493",
  storageBucket: "fir-experiments-16493.appspot.com",
  messagingSenderId: "646710968437",
  appId: "1:646710968437:web:a04fd85f922b759ca0783c",
};

firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = firebase;
module.exports = firebaseAuth;
