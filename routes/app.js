const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  // Extract the user token and perform validation..
  console.log(request.user); // get the user details from here..
  response.json({ msg: "hii" });
});

// testing route..
router.get("/data", (request, response) => {
  // Extract the user token and perform validation..
  console.log(request.user); // get the user details from here..
  response.json({
    todo: [
      {
        id: 1,
        name: "hello",
      },
      {
        id: 2,
        name: "World",
      },
      {
        id: 3,
        name: "test",
      },
    ],
  });
});

module.exports = router;
