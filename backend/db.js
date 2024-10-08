// //Another workaround - works locally
// "use strict";
// /** Database setup for jobly. */
// const { Client } = require("pg");
// const { getDatabaseUri } = require("./config");

// let DB_URI;

// if (process.env.NODE_ENV === "test") {
//   DB_URI = "postgresql:///parkfinder_test";
// } else {
//   DB_URI = "postgresql:///parkfinder";
// }

// let db = new Client({
//   connectionString: DB_URI
// });

// db.connect();

// module.exports = db;

"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db = new Client({
  connectionString: getDatabaseUri(),
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error', err.stack));

module.exports = db;