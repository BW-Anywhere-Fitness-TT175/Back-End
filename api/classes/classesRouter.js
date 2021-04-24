const router = require('express').Router();
const Classes = require('./classesModel.js');

router.get("/", async (req, res, next) => {
  try {
    const classes = await Helpers.getClasses();
    res.status(200).json(classes);
  } catch (err) {
    err.message = "Server failed to get classes";
    next();
  }
});

module.exports = router;
