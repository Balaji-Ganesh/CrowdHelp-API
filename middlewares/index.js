const firebaseAdmin = require("../config/firebase/firebase-config");
class Middleware {
  async decodeToken(request, response, next) {
    const securePaths = ["/create-campaign", "/fund-campaign", "/end-campaign"];
    // do authentication for only secure paths..
    if (securePaths.includes(request.path.substr(4))) {
      try {
        // Extract the token
        const token = request.headers.authorization.split(" ")[1];
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
    } else return next(); // skip authentication for other [public] routes..
  }
}

// Export the object of the class.
module.exports = new Middleware();
