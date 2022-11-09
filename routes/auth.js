// --- NOTE: this way of authentication is not considering. using firebase-admin way,











// const firebaseAuth = require("../config/firebase/firebase");
const express = require("express");
const router = express.Router();

// Sign-up route..
router.post("/sign-up", async (request, response) => {
  console.log(request.body);
  // if received no email and password..
  if (!request.body.email || !request.body.password) {
    return response.status(422).json({
      email: "email is required",
      pwd: "password is required",
    });
  }
  // when received..
  await firebaseAuth
    .createUserWithEmailAndPassword(request.body.email, request.body.password)
    .then((data) => res.status(201).json(data))
    .catch((error) => {
      if (error.code == "auth/weak-password") {
        return response.status(500).json({ error: error.message });
      } else return response.status(500).json({ error: error.message });
    });
});

module.exports = router;
