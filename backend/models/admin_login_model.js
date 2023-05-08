const db = require('../database');

const admin = {
    checkPassword: function(username, callback) {
        return db.query("select password from administrators where userName = ?", [username], callback);
    },

    checkRoot: function(callback) {
        return db.query('select * from administrators where userName = "root"', callback);
    }
}

module.exports=admin;