const router = require("express").Router();
const Helpers = require("./helpersModel.js");

router.get("/categories", async (req, res, next) => {
  try {
    const cats = await Helpers.getCategories();
    res.status(200).json(cats);
  } catch (err) {
    err.message = "Server failed to get categories";
    next();
  }
});

router.get("/roles", async (req, res, next) => {
  try {
    const roles = await Helpers.getRoles();
    res.status(200).json(roles);
  } catch (err) {
    err.message = "Server failed to get roles";
    next();
  }
});

router.get("/classes", async (req, res, next) => {
  try {
    const classes = await Helpers.getClasses();
    res.status(200).json(classes);
  } catch (err) {
    err.message = "Server failed to get classes";
    next();
  }
});

module.exports = router;
