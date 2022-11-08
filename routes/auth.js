const firebaseAdmin = require("../config/firebase/firebase");
const express = require("express");
const router = express.Router();
// Sign-up route..
router.post("/sign-up", async (request, response) => {
  // console.log(request.body);
  try {
    await firebaseAdmin.auth().createUser({
      email: request.body.email,
      password: request.body.password,
      displayName: request.body.firstName + " " + request.body.lastName,
      emailVerified: false, // as a new user, ..
      disabled: false, // acount disabled
    });
    response.status(200).json({ msg: "Sign-up success." });
  } catch (error) {
    // console.log("[INFO] Error in creation of new user.");
    response.status(500).json({
      msg: error.message,
    });
  }
});

// Sign-in route..
router.post("/sign-in", async (request, response) => {
  // console.log(request.body);
  try {
    await firebaseAdmin
      .auth()
      .getUserByEmail(request.body.email)
      .then((userRecord) => {
        console.log(userRecord.toJSON());
        // need to verify password -- how to do???
      });
    response.status(200).json({ msg: "Sign-in success." });
  } catch (error) {
    // console.log("[INFO] Error in creation of new user.");
    response.status(500).json({
      msg: error.message,
    });
  }
});

// test route..
router.get("/", (request, response) => {
  response.json("auth routes in working state.");
});
module.exports = router;
