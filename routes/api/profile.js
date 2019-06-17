// const mongoose = require("mongoose")
const passport = require("passport")
const express = require("express")
const router = express.Router()

// validator
const validationProfile = require("../../validation/profile")
const validationExperiences = require("../../validation/experiences")
const validationEducation = require("../../validation/educations")

// loading models
const Profile = require("../../models/Profile")
const User = require("../../models/User")

// mongoose.set("useFindAndModify", false)

// current users
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {}

    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        // profile exists
        if (!profile) {
          errors.notFound = "Profile not found"
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch(err => {
        return res.status(404).json(err)
      })
  }
)

// @route   GET api/profile/handle/:handle
// @desc    GET profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {}

  Profile.findOne({
    handle: req.params.handle
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "Profile not found"
        return res.status(404).json(errors)
      }
      return res.json(profile)
    })
    .catch(err => {
      return res.status(404).json("There is no profile found")
    })
})

// @route   GET api/profile/user/:user_id
// @desc    GET profiles by user ID
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {}

  Profile.findOne({
    user: req.params.user_id
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "Profile not found"
        return res.status(404).json(errors)
      }
      return res.json(profile)
    })
    .catch(err => {
      return res.status(404).json("There is no profile found")
    })
})

// @route   GET api/profile/all
// @desc    GET all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {}

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = "Profile not found"
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err => {
      return res.status(404).json("There are no profiles found")
    })
})

// @route   POST api/profile
// @desc    create/update profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validationProfile(req.body)

    if (!isValid) {
      console.log(`what is error => ${errors}`)
      return res.status(404).json(errors)
    }
    // get fields
    const profileFields = {}
    profileFields.user = req.user.id

    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.status) profileFields.status = req.body.status
    // Skills - split into array
    if (req.body.skills) {
      profileFields.skills = req.body.skills.split()
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

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        console.log(`it's profile that we bring \n ${profile}`)
        // Update
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        ).then(profil => {
          console.log(`why the F it's null? ${profil}`)
          res.json(profil)
        })
      } else {
        console.log(`no profile found => ${profile}`)
        // check if handle exist so it would not have double handle
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists"
            res.status(400).json(errors)
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

// @route   POST api/experience
// @desc    add experiences to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validationExperiences(req.body)

    if (!isValid) {
      return res.status(404).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // add to exp array
      profile.experiences.unshift(newExp)
      profile.save().then(err => {
        res.json(profile)
      })
    })
  }
)

// @route   POST api/education
// @desc    add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validationEducation(req.body)

    if (!isValid) {
      return res.status(404).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        institution: req.body.institution,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // add to education array
      profile.education.unshift(newExp)
      profile.save().then(err => {
        res.json(profile)
      })
    })
  }
)

// @route   DELETE api/experience
// @desc    delete experiences on profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // get remove index
      const removeIndex = profile.experiences
        .map(item => item.id)
        .indexOf(req.params.exp_id)

      // Splice out of array
      profile.experiences.splice(removeIndex, 1)

      profile.save().then(profile => {
        res.json(profile)
      })
    })
  }
)

// @route   DELETE api/experience
// @desc    delete experiences on profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id)

      // Splice out of array
      profile.education.splice(removeIndex, 1)

      profile.save().then(profile => {
        res.json(profile)
      })
    })
  }
)

// @route   DELETE api/profile
// @desc    delete profile and user
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(success => {
        res.json(success)
      })
    })
  }
)

module.exports = router
