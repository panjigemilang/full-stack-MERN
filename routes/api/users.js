const express = require("express")
const router = express.Router()
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const passport = require("passport")

// Key
const keys = require("../../config/keys")

// Validation
const validationRegister = require("../../validation/register")
const validationLogin = require("../../validation/login")

// @route -> GET api/users/users
router.get("/users", (req, res) =>
  res.json({
    message: "users works"
  })
)

// Register New User
router.post("/register", (req, res) => {
  const { err, isValid } = validationRegister(req.body)

  if (!isValid) {
    return res.status(400).json(err)
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      })
    } else {
      // default avatar
      const avatar = gravatar.url(req.body.email, {
        s: "400",
        r: "pg",
        d: "mm"
      })

      // make new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      })

      // bcrypting password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// Login User
router.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const { errors, isValid } = validationLogin(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  // find user by email
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(400).json({
        email: "user not found"
      })
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // create payload
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          }

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                success: true,
                // use Bearer protocol format
                token: "Bearer " + token
              })
            }
          )
        } else {
          return res.status(400).json({
            password: "password incorrect"
          })
        }
      })
    }
  })
})

// Passport route
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // console.log("ini res.user : ", req.user)
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
  }
)

module.exports = router
