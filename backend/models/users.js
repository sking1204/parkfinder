"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"                 
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password; // Remove the password property for security purposes
        return user; // Return sanitized user object
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
      { username, password, firstName, lastName, email, isAdmin}) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            is_admin)             
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
        [
          username,
          hashedPassword,          
          firstName,
          lastName,
          email,
          isAdmin          
        ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

  static async findAll() {
    const result = await db.query(
          `SELECT username,
                  id AS "userID",
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"                   
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"                   
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    // const userApplicationsRes = await db.query(
    //       `SELECT a.job_id
    //        FROM applications AS a
    //        WHERE a.username = $1`, [username]);

    // user.applications = userApplicationsRes.rows.map(a => a.job_id);
    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email }
   *
   * Returns { username, firstName, lastName, email}
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          firstName: "first_name",
          lastName: "last_name",
          isAdmin: "is_admin"           
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password; //deleting password from response for security purposes
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

//   /** Apply for job: update db, returns undefined.
//    *
//    * - username: username applying for job
//    * - jobId: job id
//    **/

//OLD - WORKING

static async reviewPark(username, parkCode, { review_title, review_data, rating }) {
    // Find the user by username
    const userResult = await db.query(
        "SELECT id FROM users WHERE username = $1",
        [username]
    );

    const user = userResult.rows[0];

    if (!user) {
        throw new Error("User not found");
    }

    // Insert the review into the reviews table
    const result = await db.query(
        `INSERT INTO reviewed_parks (user_id,username, park_code, review_title, review_data, rating)
         VALUES ($1, $2, $3, $4, $5, $6 )
         RETURNING id, user_id, username, park_code, review_title, review_data, rating, created_at`,
        [user.id, username, parkCode, review_title, review_data, rating]
    );

    return result.rows[0];
}


static async getReviewByUsername(username) {
    const userRes = await db.query(
        `SELECT u.username,
                u.first_name AS "firstName",
                u.last_name AS "lastName",
                u.email,
                r.review_data AS "reviewData",
                r.rating,
                r.created_at AS "createdAt"
         FROM users u
         INNER JOIN reviews r ON u.username = r.username
         WHERE u.username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    // const userApplicationsRes = await db.query(
    //       `SELECT a.job_id
    //        FROM applications AS a
    //        WHERE a.username = $1`, [username]);

    // user.applications = userApplicationsRes.rows.map(a => a.job_id);
    return user;
  }


  static async getAllReviews() {
    const result = await db.query(
      `SELECT
              rp.park_code,
              rp.review_title,
              rp.review_data,
              rp.rating,
              rp.created_at,
              u.username                  
       FROM reviewed_parks rp
       JOIN users u ON rp.user_id = u.id
       ORDER BY rp.review_title`,
    );
  
    return result.rows;
  }

  //NEW 6.28.24

  // static async saveActivity(username, parkCode, { nps_activity_id }) {
  //   // Find the user by username
  //   const userResult = await db.query(
  //       "SELECT id FROM users WHERE username = $1",
  //       [username]
  //   );

  //   const user = userResult.rows[0];

  //   if (!user) {
  //       throw new Error("User not found");
  //   }

  //   // Insert the review into the reviews table
  //   const result = await db.query(
  //       `INSERT INTO saved_activities (user_id,username, park_code, nps_activity_id)
  //        VALUES ($1, $2, $3, $4)
  //        RETURNING id, user_id, username, park_code, nps_activity_id`,
  //       [user.id, username, parkCode, nps_activity_id]
  //   );

  //   return result.rows[0];

  static async saveActivities(username, parkCode, nps_activity_ids) {
    // Find the user by username
    const userResult = await db.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
  
    const user = userResult.rows[0];
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Prepare the data to insert multiple rows for each activity ID
    const insertPromises = nps_activity_ids.map(async (nps_activity_id) => {
      const result = await db.query(
        `INSERT INTO saved_activities (user_id, username, park_code, nps_activity_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id, user_id, username, park_code, nps_activity_id`,
        [user.id, username, parkCode, nps_activity_id]
      );
  
      return result.rows[0];
    });
  
    // Execute all insert operations concurrently
    const activities = await Promise.all(insertPromises);
  
    return activities;
  }

  static async saveEvents(username, parkCode, eventData) {
    // Find the user by username
    const userResult = await db.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
  
    const user = userResult.rows[0];
  
    if (!user) {
      throw new Error("User not found");
    }
    const result = await db.query(
      `INSERT INTO saved_events (user_id, username, park_code, event_id, title, description)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, user_id, username, park_code, event_id,title,description`,
      [user.id, username, parkCode, eventData.event_id, eventData.title, eventData.description]
    );
  
    return result.rows[0]; // Assuming you want to return the saved event data
  
  
    // Prepare the data to insert multiple rows for each activity ID
    // const insertPromises = event_ids.map(async (event_id) => {
    //   const result = await db.query(
    //     `INSERT INTO saved_events (user_id, username, park_code, event_id)
    //      VALUES ($1, $2, $3, $4)
    //      RETURNING id, user_id, username, park_code, event_id`,
    //     [user.id, username, parkCode, event_id]
    //   );
  
    //   return result.rows[0];
    // });
  
    // // Execute all insert operations concurrently
    // const events = await Promise.all(insertPromises);
  
    // return events;
  }

  static async saveThingsToDo(username, parkCode, todoData) {
    // Find the user by username
    const userResult = await db.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
  
    const user = userResult.rows[0];
  
    if (!user) {
      throw new Error("User not found");
    }
    const result = await db.query(
      `INSERT INTO saved_todo_things (user_id, username, todo_id, title, short_description, location_description, park_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, user_id, username, todo_id, title, short_description, location_description,park_code`,
      [user.id, username, todoData.todo_id, todoData.title, todoData.short_description, todoData.location_description, parkCode]
    );
  
    return result.rows[0]; // Assuming you want to return the saved event data
  
  
    // Prepare the data to insert multiple rows for each activity ID
    // const insertPromises = event_ids.map(async (event_id) => {
    //   const result = await db.query(
    //     `INSERT INTO saved_events (user_id, username, park_code, event_id)
    //      VALUES ($1, $2, $3, $4)
    //      RETURNING id, user_id, username, park_code, event_id`,
    //     [user.id, username, parkCode, event_id]
    //   );
  
    //   return result.rows[0];
    // });
  
    // // Execute all insert operations concurrently
    // const events = await Promise.all(insertPromises);
  
    // return events;
  }

  static async saveFees(username, parkCode, titles) {
    // Find the user by username
    const userResult = await db.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
  
    const user = userResult.rows[0];
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Prepare the data to insert multiple rows for each fee 
    const insertPromises = titles.map(async (title) => {
      const result = await db.query(
        `INSERT INTO saved_fees (user_id, username,park_code, title)
         VALUES ($1, $2, $3, $4)
         RETURNING id, user_id, username,park_code, title`,
        [user.id, username, parkCode, title]
      );
  
      return result.rows[0];
    });
  
    // Execute all insert operations concurrently
    const fees = await Promise.all(insertPromises);
  
    return fees;
  }

  static async getSavedFees(username, parkCode = null) {
    // Find the user by username
    const userResult = await db.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
  
    const user = userResult.rows[0];
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Prepare the query and parameters
    let query = `SELECT id, user_id, username, park_code, title 
                 FROM saved_fees 
                 WHERE user_id = $1`;
    const params = [user.id];
  
    // Add park code filter if provided
    if (parkCode) {
      query += " AND park_code = $2";
      params.push(parkCode);
    }
  
    // Execute the query
    const feesResult = await db.query(query, params);
    const fees = feesResult.rows;
  
    return fees;
  }

  static async getSavedActivities(username, parkCode = null) {
    // Find the user by username
    const userResult = await db.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
  
    const user = userResult.rows[0];
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Prepare the query and parameters
    let query = `SELECT id, user_id, username, nps_activity_id,park_code
                 FROM saved_activities
                 WHERE user_id = $1`;
    const params = [user.id];
  
    // Add park code filter if provided
    if (parkCode) {
      query += " AND park_code = $2";
      params.push(parkCode);
    }
  
    // Execute the query
    const activitiesResult = await db.query(query, params);
    const activities = activitiesResult.rows;
  
    return activities;
  }

  /* WORKING ON THIS STILL>>>> NOT SURE IF NEEDED */

  static async getDetailsByParkCode(username, parkCode = null) {
    // Find the user by username
    const userResult = await db.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
  
    const user = userResult.rows[0];
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Prepare the query and parameters
    let query = `SELECT id, user_id, username, park_code, title 
                 FROM saved_fees 
                 WHERE user_id = $1`;
    const params = [user.id];
  
    // Add park code filter if provided
    if (parkCode) {
      query += " AND park_code = $2";
      params.push(parkCode);
    }
  
    // Execute the query
    const feesResult = await db.query(query, params);
    const fees = feesResult.rows;
  
    return fees;
  }



}








//     // Insert the review into the reviews table
//     const result = await db.query(
//         `INSERT INTO saved_activities (user_id,username, park_code, nps_activity_id, activity_name)
//          VALUES ($1, $2, $3, $4, $5)
//          RETURNING id, user_id, username, park_code, nps_activity_id, activity_name`,
//         [user.id, username, parkCode, nps_activity_id, activity_name]
//     );

//     return result.rows[0];
// }
  

module.exports = User;
