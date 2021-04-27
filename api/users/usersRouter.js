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

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const changedUser = await User.editUser(id, changes);
    if (changedUser === 1) {
      res.status(202).json({ message: "User was successfully updated" });
    } else {
      res.status(404).json({ message: "User was not updated" });
    }
  } catch (err) {
    err.message = "server failed to edit the user";
    next(err);
  }
});

router.post("/:id/addClass", mw.checkUserId, async (req, res, next) => {
  const user = req.user;
  const addedClass = req.body;
  const role = req.decodedToken.role_name;
  
  try {
    if (role !== 1) {
      res
        .status(403)
        .json({ message: "You must be an instructor to add a new class" });
    } else {
      const newClass = await Classes.addClass(addedClass);
      res.status(201).json(newClass);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
