exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("profiles")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("profiles").insert([
        {
          id: 1,
          first_name: "chad",
          last_name: "diaz",
          phone_number: "2015551212",
          user_id: 1,
        },
        {
          id: 2,
          first_name: "sarah",
          last_name: "rose",
          phone_number: "2015551313",
          user_id: 2,
        },
        {
          id: 3,
          first_name: "sarah",
          last_name: "guidry",
          phone_number: "2015551414",
          user_id: 3,
        },
        {
          id: 4,
          first_name: "victoria",
          last_name: "trac",
          phone_number: "2015551515",
          user_id: 4,
        },
      ]);
    });
};
