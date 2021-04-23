exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("class_categories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("class_categories").insert([
        { id: 1, cat_name: "yoga", number_visits: 5 },
        { id: 2, cat_name: "spinning", number_visits: 5 },
        { id: 3, cat_name: "aerobics", number_visits: 8 },
        { id: 4, cat_name: "zumba", number_visits: 7 },
      ]);
    });
};
