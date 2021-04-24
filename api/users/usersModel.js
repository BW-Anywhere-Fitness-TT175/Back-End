const db = require("../../data/dbConfig.js");

function getUsersById(id) {
  return db.select(
    "u.id",
    "u.email",
    "u.name",
    "u.phone_number",
    "u.role_id as instructor/student"
  );
  from("users as u").where("u.id", id);
}

// NOTE allows a teacher to create a class
async function addClass(newClass) {}

module.exports = {
    getUsersById,
};
