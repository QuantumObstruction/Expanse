var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_belknapj',
  password        : 'expanse',
  database        : 'cs361_belknapj'
});

module.exports.pool = pool;
