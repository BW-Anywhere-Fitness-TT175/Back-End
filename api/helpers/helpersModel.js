const db = require("../../data/dbConfig.js");

function getCategories() {
  return db("class_categories");
}

function getRoles() {
  return db("roles");
}

module.exports = {
  getCategories,
  getRoles,
};
