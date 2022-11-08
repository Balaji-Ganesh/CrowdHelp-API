const firebase = require("./config/firebase/admin");
function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    // if not found header token. (What is header token?)
    return response.send({ msg: "No token provided" }).status(401);
  }
  // if.. token found but expired . in-valid..
  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return response.send({ msg: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => next())
    .catch(() => response.send({ msg: "Couldn't authorize" }).status(403));
}

module.exports = authMiddleware;
