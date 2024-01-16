const mysql = require("@/pages/api/mysql");

const connection = mysql.createConnection({
  host: "109.106.254.1",
  user: "u169097824_super15",
  password: "SkylineMeridian@2024",
  database: "u169097824_Super15",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the remote database!");
});
