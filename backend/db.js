// //Another workaround - works locally
"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let DB_URI = "postgresql:///parkfinder";

// if (process.env.NODE_ENV === "test") {
//   DB_URI = "postgresql:///react_jobly_solution_test";
// } else {
//   DB_URI = "postgresql:///react_jobly_solution";
// }

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;