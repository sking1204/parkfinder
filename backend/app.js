"use strict";

/** Express app for parkfinder. */
const path = require("path"); // Import the path module

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const {authenticateJWT} = require("./middleware/auth")

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const parkRoutes = require("./routes/parks")




 


const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT) // this is applied globally for all routes

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/parks", parkRoutes);

// Serve static files from the React app - 8/12
app.use(express.static(path.join(__dirname, "client/build")));

// For any request that doesn't match one above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});




/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
