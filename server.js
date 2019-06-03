// Required modules
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")

const app = express()

// Body Parser
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())

// Routes
const user = require("./routes/api/users")
const profile = require("./routes/api/profile")
const post = require("./routes/api/posts")

// DB Config
const db = require("./config/keys").mongoURI

// Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

// Passport Middleware
app.use(passport.initialize())

// Passport config
require("./config/passport")(passport);

// use routes
app.use("/api/users", user)
app.use("/api/profile", profile)
app.use("/api/posts", post)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))