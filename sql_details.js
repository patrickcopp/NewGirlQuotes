var mysql      = require('mysql2');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Password123',
  database : 'logs',
  port: 3306
});
module.exports = pool;