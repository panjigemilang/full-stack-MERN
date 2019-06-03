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
    const {
        err,
        isValid
    } = validationRegister(req.body)

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
            const avatar = gravatar.url(req.body.email, {
                s: "400",
                r: "pg",
                d: "mm"
            })

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            })

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

    const {
        err,
        isValid
    } = validationLogin(req.body)

    if (!isValid) {
        return res.status(400).json(err)
    }

    // find user by email
    User.findOne({
        email
    }).then(user => {
        if (!user) {
            err.email = "User not found"
            return res.status(404).json({
                err
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
                        keys.secretorKey, {
                            expiresIn: 3600
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                // we use Bearer protocol format
                                token: "Bearer " + token
                            })
                        }
                    )
                } else {
                    err.password = "Password incorrect"
                    return res.status(400).json({
                        err
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