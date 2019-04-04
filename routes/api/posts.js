const express = require('express');
const router = express.Router();

router.get('/posts', (req, res) => res.json({
    message: "posts works"
}));

module.exports = router;