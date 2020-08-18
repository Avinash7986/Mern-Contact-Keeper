const express = require('express');

const router = express.Router();

// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private

router.get('/', (req, res) => {
  res.send('Get Contacts');
});
// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private

router.get('/:id', (req, res) => {
  res.send('Get Single Contact');
});

// @route   POST api/contacts
// @desc    Create a contact
// @access  Private

router.post('/', (req, res) => {
  res.send('POSt Contacts');
});

// @route   PUT api/contacts
// @desc    Update Contact
// @access  Private

router.put('/:id', (req, res) => {
  res.send('PUT Contacts');
});

// @route   DELETE api/contacts
// @desc    Delete all contacts
// @access  Private

router.delete('/', (req, res) => {
  res.send('Delete Contacts');
});

module.exports = router;
