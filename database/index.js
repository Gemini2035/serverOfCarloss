const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'blogDatabase',
    port: '3306'
});

connection.connect();

module.exports = connection;
