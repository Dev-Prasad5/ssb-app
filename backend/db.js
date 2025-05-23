const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // change if your MySQL user is different
  password: '',           // your MySQL password
  database: 'ppdt_db'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('MySQL connected successfully.');
});

module.exports = db;
