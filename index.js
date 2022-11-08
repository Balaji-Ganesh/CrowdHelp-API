// load libraries..
const express = require("express");
const bodyParser = require("body-parser");

// load routes..
const authRoutes = require("./routes/auth");

// Instantiate..
const app = express();

// middlewares..
app.use(bodyParser.json()); // handle JSON data exchanges..

// Routes..
app.use("/auth", authRoutes);

app.use("/", (req, res) => {
  // ONLY for testing..
  res.send("Hello World");
});

// listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
