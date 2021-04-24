const router = require("express").Router();
const User = require("./usersModel.js");
const Classes = require("../classes/classesModel.js");
const mw = require("../middleware/middleware.js");

router.get("/", (req, res, next) => {
  res.status(200).json({ users: "endpoint up" });
});

router.get("/:id", mw.checkUserId, (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
