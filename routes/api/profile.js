<<<<<<< HEAD
const mongoose = require("mongoose")
const passport = require("passport")
const express = require("express")
const router = express.Router()

// validator Profile
const validationProfile = require("../../validation/profile")
=======
const mongoose = require('mongoose')
const passport = require('passport')
const express = require('express');
const router = express.Router();

// loading models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// current users
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const error = {}

    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        // profile exists
        if (!profile) {
            error.notFound = "Profile not found"
            return res.status(404).json(error)
        }
        res.json(profile)
    }).catch(err => {
        return res.status(404).json(err)
    })
})

// create user Profile
router.post('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // get fields
    const profileFields = {};
    profileFields.userId = req.user.id

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    // Skills - split into array
    if (req.body.skills) {
        profileFields.skills = req.body.skills.split();
    }
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.github) profileFields.github = req.body.github;
    if (req.body.date) profileFields.date = req.body.date;

    // Experiences

    // Education
    // Socials
})
>>>>>>> 5228c2e3979cbae547e339727672f623d07c0d81

// loading models
const Profile = require("../../models/Profile")
const User = require("../../models/User")

// current users
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const error = {}

    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        // profile exists
        if (!profile) {
          error.noProfile = "Profile not found"
          return res.status(404).json(error)
        }
        res.json(profile)
      })
      .catch(err => {
        return res.status(404).json(err)
      })
  }
)

// create user Profile
router.post(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validationProfile(req.body)
    console.log(`errors : ${errors}`)
    // check if valid
    if (!isValid) {
      console.log(`masuk isvalid : SUCCESS + ${errors}`)
      return res.status(404).json(errors)
    }

    // get fields
    const profileFields = {}
    profileFields.userId = req.user.id

    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.status) profileFields.status = req.body.status
    // Skills - split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",")
    }

    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.github) profileFields.github = req.body.github
    if (req.body.date) profileFields.date = req.body.date

    // Experiences

    // Education

    // Social
    profileFields.social = {}
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.body.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile)
        })
      } else {
        // check if handle exist so it would not have double handle
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists"
            res.status(404).json(errors)
          }
          // Create profile
          new Profile(profileFields).save().then(profile => {
            res.json(profile)
          })
        })
      }
    })
  }
)

module.exports = router
