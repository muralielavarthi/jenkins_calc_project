const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
  console.log("MySQL Connected...");
});

app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  const result = Number(num1) + Number(num2);

  const query = "INSERT INTO results (num1, num2, result) VALUES (?, ?, ?)";
  db.query(query, [num1, num2, result]);

  res.json({ result });
});

app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;
  const result = Number(num1) - Number(num2);

  const query = "INSERT INTO results (num1, num2, result) VALUES (?, ?, ?)";
  db.query(query, [num1, num2, result]);

  res.json({ result });
});

const PORT = process.env.BACKEND_PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
