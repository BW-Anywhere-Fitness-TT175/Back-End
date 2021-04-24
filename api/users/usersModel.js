const db = require('../../data/dbConfig.js');

function getUsersById(id) {
    return db
        .select('u.id', "u.email", "u.first_name", "u.last_name", )
    
}






// NOTE allows a teacher to create a class
async function addClass(newClass){

}


module.exports = {

}