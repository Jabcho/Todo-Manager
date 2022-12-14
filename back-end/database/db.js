const mysql = require('mysql');
const secret = require("../secret");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'jabcho',
    password: secret.dbpw,
    database: 'todo'
})

module.exports = connection;

