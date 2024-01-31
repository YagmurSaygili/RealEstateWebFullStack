const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    // Security reasons
    Users.create({
      username: username,
      password: hash, // Passing hashed value of password instead of passing password directly, security
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "There is no User with that Username" });
   } // If such user does not exist with the given username
  // We cannot unhash the password we just hashed  but we can hash original password and compare them to see if matching happens

  bcrypt.compare(password, user.password).then((match) => { // Incase not match, server crashed

    if (!match){
        // There is a problem I dont know why, when program comes here
        // It instantly crashes with password null sort of error
        //TODO: Will
        res.json({ error: "Wrong Username and Password Combination" });
    } 
    

    res.json("YOU LOGGED IN");
  } ,[]);
});

module.exports = router;
