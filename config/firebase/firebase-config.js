const { credential } = require("firebase-admin");
const firebaseAdmin = require("firebase-admin");
const serviceAccountKey = require("./serviceAccountKey_experiment.json"); // currently this is of experiemnt project. Once tests done, switch to real one.

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

module.exports = firebaseAdmin;