var mysql = require("mysql2");
const hostname = "0.0.0.0";
var connection = mysql.createConnection({
  host: "localhost",
  database: "employee_directory",
  user: "springstudent",
  password: "springstudent",
  port: 3306,
  multipleStatements: true,
});

module.exports = connection;
