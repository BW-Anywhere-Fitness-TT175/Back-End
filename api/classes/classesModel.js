const db = require("../../data/dbConfig.js");
// NOTE returns list of all classes
// GET /api/classes
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
      "u.name as instructor"
    )
    .from("classes as c")
    .join("class_categories as cc", "c.category_id", "=", "cc.id")
    .join("users as u", "u.id", "=", "c.instructor_id");
}

// NOTE return a specific class
// GET /api/classes/:id
async function getClassById(id) {
  const [newClass] = await db
    .select(
      "c.id",
      "c.class_name as class name",
      "cc.cat_name as class type",
      "c.start_time as start time",
      "c.class_date as date",
      "c.duration",
      "c.intensity_level as intensity",
      "c.location",
      "c.max_class_size as class size",
      "c.registered_students as number of registrants",
      "u.name as instructor",
      "cc.cat_name"
    )
    .from("classes as c")
    .where({ "c.id": id })
    .join("class_categories as cc", "c.category_id", "=", "cc.id")
    .join("users as u", "u.id", "=", "c.instructor_id");
  return {
    ...newClass,
    number_of_registrants:
      newClass.classes.registered_students === null
        ? 0
        : newClass.classes.registered_students,
  };
}

// NOTE add a new class and return it
// NOTE this can only be done by user with role id of 1 = instructor
// POST /api/users/:id/classes
async function addClass(newClass) {
  const [newId] = await db("classes").insert(newClass).returning("id");
  return getClassById(newId);
}

// NOTE edits a class that is already available and returns it
// PUT /api/users/:id/classes/:classId
function editClass(id, changedClass) {
  return db("classes")
    .where({ "classes.id": id })
    .updated(changedClass)
    .first();
}

// NOTE deletes a class
// DELETE /api/users/:id/classes/:classId
function deleteClass(id) {
  return db("classes").where({ "classes.id": id }).delete();
}

/* 
"class_id": class id
"class_name": class name,
"users": [
  {
  "user_id": user id,
  "user_name": user name,
  "user_email": user email,
  "user_phone": user phone number
  },
  {
  "user_id": user id,
  "user_name": user name,
  "user_email": user email,
  "user_phone": user phone number
  },
  {
  "user_id": user id,
  "user_name": user name,
  "user_email": user email,
  "user_phone": user phone number
  },
]
*/
// NOTE returns a list of students signed up for a class

//GET /api/classes/:id/users
async function getUsersByClass(classId) {
  const res = await db("users_classes as uc")
    .join("classes as c", "uc.class_id", "c.id")
    .join("users as u", "u.id", "uc.user_id")
    .where("uc.class_id", classId)
    .select(
      "c.id as class_id",
      "c.class_name",
      "c.category_id as type",
      "uc.user_id as user_id",
      "u.name as user_name",
      "u.email as user_email",
      "u.phone_number as user_phone_number"
    )
    .orderBy("c.id");

  const newObj = {
    class_id: res[0].class_id,
    name: res[0].class_name,
    type: res[0].type,
    students: res.map((stu) => {
      return {
        id: stu.user_id,
        name: stu.user_name,
        email: stu.user_email,
        phone: stu.user_phone_number,
      };
    }),
  };
  return newObj;
}

module.exports = {
  getClasses,
  getClassById,
  addClass,
  editClass,
  deleteClass,
  getUsersByClass,
};
