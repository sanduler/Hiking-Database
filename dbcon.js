var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_jonesr2',
  password        : '9118',
  database        : 'cs340_jonesr2'
});
module.exports.pool = pool;