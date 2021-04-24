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

// NOTE allows a teacher to create a class
async function addClass(newClass) {}

module.exports = {
  getUsersById,
};
