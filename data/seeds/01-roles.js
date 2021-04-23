exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("roles").insert([
        { id: 1, role_name: "instructor" },
        { id: 2, role_name: "student" },
      ]);
    });
};
