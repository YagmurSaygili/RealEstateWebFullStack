const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:propertyId", async (req, res) => {
  const propertyId = req.params.propertyId;
  const comments = await Comments.findAll({
    where: { PropertyId: propertyId },
  });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  // Passing middleware as validatetoken variable
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
