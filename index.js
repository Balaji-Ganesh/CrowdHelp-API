// load libraries & middlewares..
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const middleware = require("./middlewares");

// load routes..
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/app");

// Instantiate..
const app = express();

// middlewares.. -- Mind that, all the requests will pass through these.!!
app.use(bodyParser.json()); // handle JSON data exchanges..
app.use(cors());
app.use(middleware.decodeToken); // used for validating the token received from client.

// Routes..
// app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.use("/", (req, res) => {
  // ONLY for testing..
  res.send("Hello World");
});

// listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
