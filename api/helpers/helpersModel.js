const db = require("../../data/dbConfig.js");

function getCategories() {
  return db("class_categories");
}

function getRoles() {
  return db("roles");
}

function getClasses() {
  return db
    .select(
      "c.class_name as class name",
      "cc.cat_name as class type",
      "c.start_time as start time",
      "c.class_date as date",
      "c.duration",
      "c.intensity_level as intensity",
      "c.location",
      "c.max_class_size as class size",
      "c.registered_students as number of registrants",
      "u.first_name as instructor"
    )
    .from("classes as c")
    .join("class_categories as cc", "c.category_id", "=", "cc.id")
    .join("users as u", "u.id", "=", "c.instructor_id");
}

module.exports = {
  getCategories,
  getRoles,
  getClasses,
};
