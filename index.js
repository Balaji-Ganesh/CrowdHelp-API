// load libraries & middlewares..
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const middleware = require("./middlewares");

// load routes..
// const authRoutes = require("./routes/auth");
// const campaignRoutes = require("./routes/campaigns.routes");

// Instantiate..
const app = express();

// middlewares.. -- Mind that, all the requests will pass through these.!!
app.use(bodyParser.json()); // handle JSON data exchanges..
app.use(cors());
// app.use(middleware.decodeToken); // used for validating the token received from client.

// Routes..
// app.use("/auth", authRoutes);
// app.use("/api", campaignRoutes);
require("./routes/campaigns.routes")(app); // HigherOrderFunction, app object obeys the routes..

app.use("/", (req, res) => {
  // ONLY for testing..
  // console.log(");
  res.send(
    "You queried for '" +
      req.path +
      "' with '" +
      req.method +
      "' method. \n\
      I'm 404-Not_Found. \n\
    You've reached me as used incorrect or undefined route-name or method. \n\
    Don't panic, just cross-check."
  );
});

// listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
