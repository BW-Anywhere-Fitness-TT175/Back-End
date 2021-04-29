const router = require("express").Router();
const User = require("./usersModel.js");
const Classes = require("../classes/classesModel.js");
const mw = require("../middleware/middleware.js");
const { JWT_SECRET } = require("../secrets/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
  res.status(200).json({ users: "endpoint up" });
});

// ✔️ // allows a user to get their info
router.get("/:id", mw.checkUserId, mw.restricted, (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// ✔️ // Allows a user to update their info
router.put("/:id", mw.restricted, async (req, res, next) => {
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

// NOTE Allows an Instructor to add a new class to the database
// ✔️
router.post(
  "/:id/class",
  mw.checkUserId,
  mw.restricted,
  async (req, res, next) => {
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
  }
);

// Allow an Instructor to see a specific class they've created
// ✔️
router.get(
  "/:id/class/:classId",
  mw.checkUserId,
  mw.restricted,
  (req, res, next) => {
    const { classId } = req.params;
    Classes.getClassById(classId)
      .then(([retClass]) => {
        res.status(200).json(retClass);
      })
      .catch((err) => {
        err.message = "Server failed getting class";
        next(err);
      });
  }
);

// Allow an Instructor to edit a class they've created
router.put(
  "/:id/class/:classId",
  mw.checkUserId,
  mw.restricted,
  (req, res, next) => {
    const { classId } = req.params;
    const changes = req.body;
    Classes.editClass(classId, changes)
      .then((changedClass) => {
        res.status(201).json(changedClass);
      })
      .catch((err) => {
        err.message = "Server failed to change the class";
        next(err);
      });
  }
);

// ✔️
router.post(
  "/register",
  mw.checkRegBody,
  mw.checkEmailFree,
  async (req, res, next) => {
    const credentials = req.body;
    try {
      const hash = bcrypt.hashSync(credentials.password, 10);
      credentials.password = hash;
      const user = await User.addUser(credentials);
      res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
      err.message = "Server failed to register user";
      next(err);
    }
  }
);

// ✔️
router.post(
  "/login",
  mw.checkLoginBody,
  mw.checkEmailValid,
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findBy({ email }).first();
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: "Login successful!",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
          },
        });
      } else {
        res.status(401).json({ message: "invalid credentials!" });
      }
    } catch (err) {
      err.message = "failed logging into server!";
      next(err);
    }
  }
);

function generateToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    role_name: user.role_id,
  };

  const options = {
    expiresIn: "1h",
  };

  const secret = JWT_SECRET;

  return jwt.sign(payload, secret, options);
}

module.exports = router;
