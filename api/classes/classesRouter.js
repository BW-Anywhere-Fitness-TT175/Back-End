const router = require("express").Router();
const Classes = require("./classesModel.js");

// NOTE get a list of all classes - not restricted
router.get("/", async (req, res, next) => {
  try {
    const classes = await Classes.getClasses();
    res.status(200).json(classes);
  } catch (err) {
    err.message = "Server failed to get classes";
    next();
  }
});

// NOTE get a specific class - not restricted
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneClass = await Classes.getClassById(id);
    res.status(200).json(oneClass);
  } catch (err) {
    err.message = "Server failed to get class";
    next(err);
  }
});

// NOTE get a list of all users per class - not restricted
router.get("/:classId/users", async (req, res, next) => {
  const { classId } = req.params;

  try {
    const list = await Classes.getUsersByClass(classId);
    res.status(200).json(list);
  } catch (err) {
    err.message = "Server failed to get class with registered students";
    console.log(err);
    next(err);
  }
});

module.exports = router;
