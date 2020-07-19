var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  // Use these settings to use the OSU MariaDB database
  // host            : 'classmysql.engr.oregonstate.edu',
  // user            : 'cs361_belknapj',
  // password        : 'expanse',
  // database        : 'cs361_belknapj'
  
  // I use this to test on a MariaDB on my local PC for testing
  // host            : 'localhost',
  // user            : 'root',
  // password        : 'Rebec@28',
  // database        : 'test'
  
  // Use these settings to emulate successful db accesses 
  // for testing (remember to set dbEmulation = true in
  // weatherApp.js)
  host            : 'localhost',
  user            : 'root',
  password        : 'none',
  database        : 'none'
});

module.exports.pool = pool;
