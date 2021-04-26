exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("classes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("classes").insert([
        {
          id: 1,
          class_name: "Yoga by Aja",
          start_time: "11:00 AM",
          class_date: "5/1/2021",
          duration: 1.0, // hours
          intensity_level: 3,
          location: "Los Angeles",
          registered_students: 1,
          max_class_size: 20,
          instructor_id: 5,
          category_id: 1,
        },
        {
          id: 2,
          class_name: "Spinning by Aja",
          start_time: "12:00 AM",
          class_date: "6/5/2021",
          duration: 2.0, // hours
          intensity_level: 3,
          location: "Phoenix",
          registered_students: 1,
          max_class_size: 10,
          instructor_id: 5,
          category_id: 2,
        },
        {
          id: 3,
          class_name: "Aerobics by Sarah",
          start_time: "5:00 PM",
          class_date: "5/13/2021",
          duration: 3.0, // hours
          intensity_level: 3,
          location: "Cleveland",
          registered_students: 1,
          max_class_size: 30,
          instructor_id: 2,
          category_id: 3,
        },
        {
          id: 4,
          class_name: "Zumba by Chad",
          start_time: "2:00 PM",
          class_date: "7/1/2021",
          duration: 4.0, // hours
          intensity_level: 5,
          location: "Baltimore",
          registered_students: 1,
          max_class_size: 15,
          instructor_id: 1,
          category_id: 4,
        },
      ]);
    });
};
