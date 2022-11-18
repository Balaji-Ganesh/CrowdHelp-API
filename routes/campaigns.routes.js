const express = require("express");
const router = express.Router();
const campaigns = require("../controllers/campaigns.controller");

module.exports = (app) => {
  // GET routes.. for these no authentications gets done.
  router.get("/active-campaigns/:count", campaigns.activeCampaigns); // NOTE; by /:count, can access req.params.count in controller
  router.get("/campaign/:address", campaigns.viewCampaign); // NOTE; by /:count, can access req.params.count in controller
  // router.get("/all-campaigns/:count/:userId", campaigns.allCampaigns); // NOTE; by /:userId, can access req.params.userId in controller
  /////// 🔺  will be dealt later.

  // POST routes..  for these authentication gets done.
  // when done successfully, can access `request.user` which contain user-credentials extracted from JWT token.
  router.post("/create-campaign", campaigns.createCampaign);
  router.post("/fund-campaign/:address", campaigns.fundCampaign);
  router.delete("/abort-campaign/:address", campaigns.abortCampaign);

  // testing purpose..
  router.get("/", (request, response) => {
    response.json({ msg: "hii" });
  });

  // make `app` to use this route..
  app.use("/api", router);
};
