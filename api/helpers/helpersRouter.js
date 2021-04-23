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

module.exports = router;
