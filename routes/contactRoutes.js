const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const User = require('../models/User');

const router = express.Router();

router.use(auth);

// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort(
      '-createdAt'
    );
    res.status(200).send(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});
// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private

router.get('/:id', async (req, res) => {
  try {
    let contact = await Contact.find({ _id: req.params.id, user: req.user.id });

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    res.status(200).send(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST api/contacts
// @desc    Create a contact
// @access  Private

router.post(
  '/',
  [
    check('name', 'Please Provide name').not().isEmpty(),
    check('email', 'Please provide email').isEmail(),
  ],
  async (req, res) => {
    try {
      req.body.user = req.user.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }

      const contact = await Contact.create(req.body);

      res.status(201).send(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ msg: 'Server Error' });
    }
  }
);

// @route   PUT api/contacts
// @desc    Update Contact
// @access  Private

router.put(
  '/:id',
  [check('email', 'Please provide valid email').exists().isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }
      let contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({ msg: 'Contact not found' });
      }

      // Make sure user is contact owner
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorize' });
      }

      contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.status(200).send(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ msg: 'Server Error' });
    }
  }
);

// @route   DELETE api/contacts
// @desc    Delete all contacts
// @access  Private

router.delete('/:id', async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // Make sure user is contact owner
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorize' });
    }

    await contact.remove();
    res.status(200).json({ msg: 'Contact Deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

module.exports = router;
