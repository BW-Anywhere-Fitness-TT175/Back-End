const Users = require("../users/usersModel.js");
const jwt = require("jsonwebtoken");

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

module.exports = {
  checkUserId,
};
