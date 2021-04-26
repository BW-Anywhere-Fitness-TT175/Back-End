const router = require("express").Router();
const Users = require("../users/usersModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../secrets/index.js");

const mw = require("../middleware/middleware.js");

router.post(
  "/register",
  mw.checkRegBody,
  mw.checkEmailFree,
  async (req, res, next) => {
    const credentials = req.body;
    try {
      const hash = bcrypt.hashSync(credentials.password, 10);
      credentials.password = hash;
      const user = await Users.addUser(credentials);
      res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
      err.message = "Server failed to register user";
      next(err);
    }
  }
);

router.post(
  "/login",
  mw.checkLoginBody,
  mw.checkEmailValid,
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await Users.findBy({ email }).first();
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({
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
