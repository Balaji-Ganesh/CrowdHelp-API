const firebaseAdmin = require("firebase-admin");
const credentials = require("./serviceAccountKey_experiment.json"); // make sure to switch this while working on real firebase..

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(credentials),
});

module.exports = firebaseAdmin;

// const firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/firestore");rs

// const firebaseConfig = {
//   apiKey: "AIzaSyCqkXQ1RXsNc4h1o-crilJ4kyk-kP2sELY",
//   authDomain: "fir-experiments-16493.firebaseapp.com",
//   projectId: "fir-experiments-16493",
//   storageBucket: "fir-experiments-16493.appspot.com",
//   messagingSenderId: "646710968437",
//   appId: "1:646710968437:web:a04fd85f922b759ca0783c",
// };

// firebase.initializeApp(firebaseConfig);
// module.exports = firebase;
