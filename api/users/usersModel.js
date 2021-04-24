const db = require("../../data/dbConfig.js");

async function getUsersById(id) {
  const [user] = await db
    .select("u.id", "u.email", "u.name", "u.phone_number", "u.role_id as role")
    .from("users as u")
    .where({ "u.id": id });
  return {
    ...user,
    role: user.role == 1 ? "instructor" : "student",
  };
}

//NOTE function used to router.put to allow user to change password
function getFullUserDetails(id) {
  return db("users").first().where({ "users.id": id });
}

function getUserByEmail(email) {
  return db("users").first().where({ email });
}

async function addUser(newUser) {
  const [newId] = await db("users").insert(newUser, ["id"]);
  return getUsersById(newId.id ?? newId);
}

function editUser(id, changedUser) {
  return db("users").where({ id }).update(changedUser);
}

// NOTE allows a teacher to create a class
async function addClass(newClass) {}

module.exports = {
  getUsersById,
  getFullUserDetails,
  getUserByEmail,
  addUser,
  editUser,
};
