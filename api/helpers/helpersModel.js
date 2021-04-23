const db = require("../../data/dbConfig.js");

function getCategories() {
    return db('class_categories');
}




module.exports = {
    getCategories,
}