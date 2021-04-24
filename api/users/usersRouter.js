const router = require("express").Router();
const User = require("./usersModel.js");
const mw = require("../middleware/middleware.js");

router.get("/", (req, res, next) => {
  res.status(200).json({ users: "endpoint up" });
});

router.get("/:id", mw.checkUserId, (req, res, next) => {
  const user = req.user;
  res.status(200).json(user);
});

module.exports = router;
