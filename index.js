// load libraries..
const express = require("express");

// Instantiate..
const app = express();

// middlewares..
app.use("/", (req, res) => {
  res.send("Hello World");
});

// listen
app.listen(4000, () => console.log("Server running on PORT 4000"));
