var mysql = require("mysql2");
const hostname = "0.0.0.0";
var connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  database: "sql6633889",
  user: "sql6633889",
  password: "tm8StQP3ah",
  port: 3306,
  multipleStatements: true,
});

module.exports = connection;
