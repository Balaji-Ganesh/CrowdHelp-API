const firebaseAdmin = require("../config/firebase/firebase-config");

// for firestore..
const firestoreDB = firebaseAdmin.firestore();

// Collections working on..
const campaigns = firestoreDB.collection("campaigns");
const users = firestoreDB.collection("users");

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

exports.viewCampaign = (req, res) => {
  /* What to do here??..
      0. Get the campaign details based on `req.params.address`.
      ‼ May be, we also need to extract data from blockchain. -- unsure about this -- help-wanted.
  */

  try {
    // fetch all active campaigns & filter with `req.params.count`.
    return res.status(200).json(`Sending ${req.params.address} campaign`);
  } catch (err) {
    // NOTE: decide status code based on the error..
    return res.status(500).json({ msg: "error-message" });
  }
};

exports.createCampaign = async (req, res) => {
  /* What to do here??..
      0. Extract the `req.body` & get the UID from `req.user.UID`.
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
    // console.info(req.body);
    const {
      bannerUrl,
      title,
      description,
      ethRaised,
      category,
      deadline,
      walletAddress,
    } = req.body;

    // STEP-1: ..

    // STEP-2: Create a mini version in firestore.
    const UID = "2YuEvu0vwXcvppRn9fvqRO1LJjF3"; // currently hard-coding, but should get dynamically.
    const uniqueId = Date.now();
    await campaigns
      .doc("" + uniqueId) // actually should be the unique address of contract after deployment.
      .set({
        title: title,
        description: description,
        bannerUrl: bannerUrl,
        campaignStatus: "ACTIVE",
        ethRaised: ethRaised,
        category: category,
        ethFunded: 0,
        deadline: deadline,
        raisedBy: UID, // should be req.user.UID
        walletAddress: walletAddress,
      });

    // STEP-3: Attach it to the user..
    // Get the stored document -- for testing purpose..
    const campaign = await campaigns.doc("" + uniqueId).get();

    const user = users.doc("" + UID); // get the UID, to whom to be appended.
    if ((await user.get()).exists) {
      await user.update({
        campaignsRaised: firebaseAdmin.firestore.FieldValue.arrayUnion(
          campaign.id
        ),
      });
    } else {
      user.set({
        campaignsRaised: [campaign.id],
      });
    }

    // STEP-4:
    // make decision..

    // return res.status(200).json("Create campaign route");
    // Query for the document created...
    if (campaign.exists)
      return res.status(200).json({
        campaignId: campaign.id,
      });
    // based on this id, user-vew will navigate to the campaign page.
    else return res.status(200).json({ msg: "No such campaign" });
  } catch (err) {
    // NOTE: decide status code based on the error..
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Sorry, an error occured while working." });
  }
};

exports.fundCampaign = async (req, res) => {
  /*
    What to do here..?
    0. Extract the body.
    1. Perform transaction in smart contract.
    (after successful transaction)
    ---2. Update the amount raised in firestore doc.---
    3. Update the funder profile with the campaign (address) he/she contributed for.
    4. based on the result, send appropriate message.
  
    Is it necessary to update the balance in firestore?
    Can't it be fetched from blockchain?? so, STEP-2: INVALID
    */
  // console.log("fund campaign called");
  const uniqueId = req.params.address;
  try {
    // STEP-0: Extract the body
    const { amount } = req.body;
    // STEP-1:

    // STEP-2:

    // STEP-3:
    // Get the campaign to which funding happening..
    const campaign = await campaigns.doc("" + uniqueId).get();
    const UID = "Y8YQZY3GhRahhqT7uJ0bP01sfnJ2";
    if (campaign.exists) {
      const user = users.doc("" + UID); // get the UID, to whom to be appended.
      // if funding for the first time..
      if ((await user.get()).exists) {
        await user.update({
          campaignsBacked: firebaseAdmin.firestore.FieldValue.arrayUnion({
            campaignId: uniqueId,
            amount: amount,
          }),
        });
      }
      // if already funded, append this new campaignId.
      else {
        user.set({
          campaignsBacked: [{ campaignId: uniqueId, amount: amount }],
        });
      }
    } else
      return res.status(404).json({
        msg: "No such campaign exists. Please check the URL entered.",
      });
    // STEP-4:
    return res.status(200).json("fund campaign route");
  } catch (err) {
    // NOTE: decide status code based on the error..
    console.log(err);
    return res.status(500).json({ msg: "error-message" });
  }
};

exports.endCampaign = async (req, res) => {
  /* What to do here??.. (task-division of this, lacking some clarity)
    NOTE: For normal end (i.e., after time-block expiry) smart contract will handle the transaction of transfer.
    here only handling the abrupt-ending case.

      0. Extract the body {contains `reason`}
      1. Terminate/invalidate the smart-contract -- + refund the money back to the backers
      2. Update the status in firestore respective document.
      ..
      4. based on the result, send appropriate message back as acknowledgement.
    */
  try {
    // STEP-0:Extract the body {contains `reason`}
    const { reason } = req.body; // reason for aborting.
    const uniqueId = req.params.address; // address of the campaign

    // STEP-1:
    // How to invalidate -- currently unknown -- guess - use a state variable of type enum.
    /////////////////// -- here call the refund function of smart contract.

    // STEP-2:Update the status in firestore respective document.
    console.log(uniqueId);
    const campaign = campaigns.doc("" + uniqueId);
    if ((await campaign.get()).exists) {
      campaign.set(
        {
          campaignStatus: "ABORTED",
          abortReason: reason, // NOTE that..! This field will contain only when ABORTED.
        },
        { merge: true }
      );
    } else
      return res.status(404).json({
        msg: "No such campaign exists. Please check the URL entered.",
      });

    // STEP-4: Sending acknowledgement
    return res.status(200).json({ msg: "Aborted successfully." });
  } catch (err) {
    // NOTE: decide status code based on the error..
    console.log(err);
    return res.status(500).json({ msg: "error-message" });
  }
};
