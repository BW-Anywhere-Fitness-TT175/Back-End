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

// NOTE to be used in the AUTH router
// POST /api/auth/login
function findBy(filter) {
  return db("users").first().where(filter);
}

// NOTE to be used in the AUTH router
// POST /api/auth/register
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
  findBy,
  addUser,
  editUser,
};

function getClassByUserId(userId) {
  return db("user_classes")
    .join("users", "users.id", "=", "user_classes.user_id")
    .join("classes", "classes.id", "=", "user_classes.class_id")
    .select(
      "users.id AS user_id",
      "classes.id as class_id",
      "users.username",
      "classes.start_time",
      "classes.class_date",
      "classes.duration",
      "classes.type",
      "classes.intensity",
      "classes.location"
    )
    .where({ "users.id": userId });
}
