const express = require('express');

const router = express.Router();

// @route   POST api/auth
// @desc    Login a user
// @access  Public

router.post('/', (req, res) => {
  res.send('Login a user');
});

// @route   GET api/auth
// @desc    Get Logged in user
// @access  Private

router.get('/', (req, res) => {
  res.send('User Details');
});

module.exports = router;
