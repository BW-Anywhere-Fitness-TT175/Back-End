const Users = require("../users/usersModel.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index.js");

function restricted(req, res, next) {
  const token =
    req.headers?.authorization?.split(" ")[1] ?? req.headers?.authorization;
  if (!token) {
    const err = new Error();
    err.status = 401;
    err.message = "Not authorized to access this endpoint";
    next(err);
  } else {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        err.status = 401;
        err.message = "Token is not valid";
        next(err);
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  }
}

async function checkUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await Users.getUsersById(id);
    req.user = user;
    next();
  } catch (err) {
    err.status = 404;
    err.message = "User not found";
    next(err);
  }
}

function checkRegBody(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "Must register with email and password" });
  } else if (req.body.password.length > 10) {
    res
      .status(400)
      .json({ message: "password length cannot be greater than 10 chars" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "must provide first and last name!" });
  } else if (!req.body.phone_number) {
    res
      .status(400)
      .json({ message: "must provide 10 character phone number!" });
  } else if (!req.body.role_id) {
    res.status(400).json({
      message:
        "must register with role_id = 1 'instructor' or role_id = 2 'student'",
    });
  } else {
    next();
  }
}

async function checkEmailFree(req, res, next) {
  try {
    const user = await Users.findBy({ email: req.body.email });
    if (user.length > 0) {
      res.status(422).json({ message: "Email already in use" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkEmailValid(req, res, next) {
  try {
    const user = await Users.findBy({ email: req.body.email });
    if (user.length > 0) {
      next();
    } else {
      res
        .status(422)
        .json({ message: "Email has not been registered. Please register" });
    }
  } catch (err) {
    next(err);
  }
}

function checkLoginBody(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "must login with email and password" });
  } else {
    next();
  }
}

module.exports = {
  checkUserId,
  checkRegBody,
  checkEmailFree,
  checkLoginBody,
  checkEmailValid,
  restricted,
};
