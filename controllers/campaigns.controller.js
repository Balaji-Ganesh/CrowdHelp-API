exports.recentCampaigns = (req, res) => {
  /* What to do here??..
      0. Extract the body.
      1. Fetch all ACTIVE campaigns -- if possible with filter (else, get all and filter).
      2. based on the result, send appropriate message back as acknowledgement.
        - if could successfully, get campaigns - return those, else error msg.
   🌟 : take default value to be 3.
        */
  try {
    // Fetch active campaigns and filter with `req.params.count`.
    return res.status(200).json(`Sending ${req.params.count} recent campaigns`);
  } catch (err) {
    // NOTE: decide status code based on the error..
    return res.status(500).json({ msg: "error-message" });
  }
};

exports.activeCampaigns = (req, res) => {
  /* What to do here??..
      0. Extract the body.
      1. Fetch all ACTIVE campaigns -- if possible with filter (else, get all and filter).
      2. based on the result, send appropriate message back as acknowledgement.
        - if could successfully, get campaigns - return those, else error msg.
    
      🌟 : Take default value to be 10.
        */
  try {
    // fetch all active campaigns & filter with `req.params.count`.
    return res.status(200).json(`Sending ${req.params.count} active campaigns`);
  } catch (err) {
    // NOTE: decide status code based on the error..
    return res.status(500).json({ msg: "error-message" });
  }
};

exports.createCampaign = (req, res) => {
  /* What to do here??..
      0. Extract the body.
      1. Store the data in blockchain, deploy it. 
      (after successful deploy)
      2. Create a miniature document(campaign title, desc, goal, UID, ) with fundraiser ID -- get the UID from `req.user`.
        - The documentId should be the `address` we get after successful deploy.
      3. Add this address to user's profile -- as an element of array.
        - Can get UID from `req.user`.
      4. based on the result, send appropriate message back as acknowledgement.
    */
  try {
    //STEP-0: extract the data received...
    const [campaignTitle, campaignDescription] = req.body; // still more fields..

    // STEP-1: ..

    // STEP-2: ..

    // STEP-3: ..

    // STEP-4:
    // make decision..
    return res.status(200).json("Create campaign route");
  } catch (err) {
    // NOTE: decide status code based on the error..
    return res.status(500).json({ msg: "error-message" });
  }
};

exports.fundCampaign = (req, res) => {
  /*
    What to do here..?
    0. Extract the body.
    1. Perform transaction in smart contract.
    (after successful transaction)
    2. Update the amount raised in firestore doc.
    3. based on the result, send appropriate message.
  */
  try {
    // STEP-0:

    // STEP-1:

    // STEP-2:

    // STEP-3:
    return res.status(200).json("fund campaign route");
  } catch (err) {
    // NOTE: decide status code based on the error..
    return res.status(500).json({ msg: "error-message" });
  }
};

exports.endCampaign = (req, res) => {
  /* What to do here??.. (task-division of this, lacking some clarity)
    NOTE: For normal end (i.e., after time-block expiry) smart contract will handle the transaction of transfer.
    here only handling the abrupt-ending case.

      0. Extract the body {contains `reason`}
      1. Terminate/invalidate the smart-contract.
      2. Update the status in firestore respective document.
      ..
      4. based on the result, send appropriate message back as acknowledgement.
    */
  try {
    // STEP-1:

    // STEP-2:

    // STEP-3:

    // STEP-4
    return res.status(200).json("end campaign route");
  } catch (err) {
    // NOTE: decide status code based on the error..
    return res.status(500).json({ msg: "error-message" });
  }
};
