exports.recentCampaigns = (req, res) => {
  return res.status(200).json(`Sending ${req.params.count} recent campaigns`);
};

exports.activeCampaigns = (req, res) => {
  return res.status(200).json(`Sending ${req.params.count} active campaigns`);
};

exports.createCampaign = (req, res) => {
  return res.status(200).json("Create campaign route");
};

exports.fundCampaign = (req, res) => {
  return res.status(200).json("fund campaign route");
};

exports.endCampaign = (req, res) => {
  return res.status(200).json("end campaign route");
};
