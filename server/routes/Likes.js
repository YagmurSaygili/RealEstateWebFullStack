const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PropertyId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: { PropertyId: PropertyId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ PropertyId: PropertyId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: { PropertyId: PropertyId, UserId: UserId },
    });
    res.json({ liked: false });
  }
});

module.exports = router;