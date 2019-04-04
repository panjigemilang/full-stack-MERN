const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Routes
const user = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/posts');

// DB Config
const db = require('./config/keys');

// Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Sending Request'));

// use routes
app.use('/api/users', user);
app.use('/api/profile', profile);
app.use('/api/posts', post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));