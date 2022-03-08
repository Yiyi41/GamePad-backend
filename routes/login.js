const express = require("express");
const User = require("../models/User");
const router = express.Router();

// VARIABLES FOR AUTHENTIFICATION
const { SHA256 } = require("crypto-js");
const encBase64 = require("crypto-js/enc-base64");

router.post("/login", async (req, res) => {
  try {
    const userToLogin = await User.findOne({ email: req.fields.email });
    // console.log(userToLogin);
    const hash = SHA256(req.fields.password + userToLogin.salt).toString(
      encBase64
    );
    // console.log(hash);
    if (hash === userToLogin.hash) {
      res.status(200).json({
        id: userToLogin.id,
        token: userToLogin.token,
        account: userToLogin.account,
      });
    } else {
      res.status(400).json("Unauthorized !");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
