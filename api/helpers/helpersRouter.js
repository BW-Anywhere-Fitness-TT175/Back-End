const router = require("express").Router();
const Helpers = require("./helpersModel.js");

router.get("/categories", async (req, res, next) => {
  try {
    const cats = await Helpers.getCategories();
    res.status(200).json(cats);
  } catch (err) {
    next(err);
  }
});

router.get("/roles", async (req, res, next) => {
  try {
    const roles = await Helpers.getRoles();
    res.status(200).json(roles);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
