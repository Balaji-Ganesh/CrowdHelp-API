const firebaseAdmin = require("../config/firebase/firebase-config");
class Middleware {
  async decodeToken(request, response, next) {
    // Extract the token
    const token = request.headers.authorization.split(" ")[1];
    try {
      // Validate the token
      const decodeValue = await firebaseAdmin.auth().verifyIdToken(token);
      //   console.log(decodeValue);
      // if had some value (indicates valid), then go to next..
      if (decodeValue) {
        request.user = decodeValue; // place the user details in request, to use in next().
        return next();
      }
      // in case not..
      return response.json({
        msg: "Unauthorized Access",
      });
    } catch (err) {
      console.log("[ERROR] " + err);
      return response.json({ msg: "Internal Error" }).status(500);
    }
  }
}

// Export the object of the class.
module.exports = new Middleware();
