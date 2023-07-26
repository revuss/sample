const express = require("express");
const app = express();
const helmet = require("helmet");
const port = process.env.PORT || 3000;
const cors = require("cors");
var connection = require("./database");
app.use(express.json());
app.use(cors());
app.use(helmet());
// Get all employee
app.get("/employee", function (req, res) {
  let sql = "Select * From employee ";
  connection.query(sql, function (err, results, fields) {
    if (err) throw err;
    res.send(results);
  });
});

// Get employee by ID
app.get("/employee/:id", (req, res) => {
  connection.query(
    "Select * from employee where id = ?",
    [req.params.id],
    (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

// Delete employee by ID
app.delete("/employee/:id", (req, res) => {
  const id = req.params;
  connection.query(
    "Delete from employee where id = ?",
    id,
    (err, results, fields) => {
      if (err) throw err;
      res.send("Data Deleted from Id " + [req.params.id]);
    }
  );
});

// Insert employee
app.post("/employee", (req, res) => {
  const { first_name, last_name, email } = req.body;
  let sqlquery =
    "INSERT INTO employee (first_name, last_name, email) VALUES (?, ?, ?)";

  connection.query(
    sqlquery,
    [first_name, last_name, email],
    (err, results, fields) => {
      if (err) throw err;
      res.send("Data Inserted of " + first_name);
    }
  );
});

// Update employee
app.put("/employee/:id", (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email } = req.body;
  let sqlquery =
    "INSERT INTO employee(id, first_name, last_name, email) VALUES (?, ?, ?, ?) \
    ON DUPLICATE KEY UPDATE first_name = VALUES(first_name), last_name = VALUES(last_name), email = VALUES(email)";

  connection.query(
    sqlquery,
    [id, first_name, last_name, email],
    (err, results, fields) => {
      if (err) throw err;
      res.send("Data Updated at employeeID : " + id);
    }
  );
});

app.listen(port, function () {
  console.log("app started at 3000");
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Data Success");
  });
});
