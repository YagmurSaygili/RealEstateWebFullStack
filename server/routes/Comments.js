const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

router.get("/:propertyId", async (req, res) => {
  const propertyId = req.params.propertyId;
  const comments = await Comments.findAll({
    where: { PropertyId: propertyId },
  });
  res.json(comments);
});

router.post("/", async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
});

module.exports = router;
