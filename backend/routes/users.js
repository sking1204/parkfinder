"use strict";
/* User routes */

const jsonschema = require("jsonschema")
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/users");
const { createToken } = require("../helpers/tokens");

const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");


const router = express.Router();

/* THIS IS FOR ADMINS ONLY TO REGISTER NEW USER */

/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

router.get("/", ensureAdmin, async function(req,res, next){
    try{
        const users = await User.findAll();
        return res.json({users});
    } catch (err){
        return next(err)
    }
})

router.get("/reviews", async function(req,res, next){
    try{
        const reviews = await User.getAllReviews();
        return res.json({reviews});
    } catch (err){
        return next(err)
    }
})

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });

router.get("/:username/reviews",  async function (req, res, next) {
  try{
    const userReview = await User.getReviewByUsername(req.params.username);
    return res.json({userReview});
  }catch(err){
    return next(err);
  }
    // return res.send("Placeholder for reviews by username...review form")
  });

//OLD

router.post("/:username/reviews/:parkCode",  async function (req, res, next) {
  try {
      const username = req.params.username;
      const parkCode = req.params.parkCode;  
      const { review_title, review_data, rating } = req.body;  // Assuming review data and rating are sent in the request body

      // Validate the rating if necessary (e.g., ensure it's between 1 and 5)
      if (rating < 1 || rating > 5) {
          return res.status(400).json({ error: "Rating must be between 1 and 5" });
      }

      const review = await User.reviewPark(username, parkCode, { review_title, review_data, rating });

      return res.json({ reviewed: review });
  } catch (err) {
      return next(err);
  }  

});

router.post("/:username/saved-activities/:parkCode",  async function (req, res, next) {
  try {
      const username = req.params.username;
      const parkCode = req.params.parkCode;  
      const { nps_activity_id, activity_name } = req.body;  // Assuming review data and rating are sent in the request body

   

      const activity = await User.saveActivity(username, parkCode, { nps_activity_id, activity_name });

      return res.json({ savedActivity: activity });
  } catch (err) {
      return next(err);
  }  

});

//INCORRECT ROUTE DOESN"T BELONG WITH USERS ROUTES:

// router.post("/parks/parkCode/:parkCode/review",  async function (req, res, next) {
//   try {
//       // const username = req.params.username;
//       const parkCode = req.params.parkCode;  
//       const { review_title, review_data, rating} = req.body;  // Assuming review data and rating are sent in the request body

//       // Validate the rating if necessary (e.g., ensure it's between 1 and 5)
//       if (rating < 1 || rating > 5) {
//           return res.status(400).json({ error: "Rating must be between 1 and 5" });
//       }

//       const review = await User.reviewPark( parkCode, { review_title, review_data, rating });

//       return res.json({ reviewed: review });
//   } catch (err) {
//       return next(err);
//   }  

// });

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username", ensureCorrectUserOrAdmin,  async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});



  


module.exports = router;