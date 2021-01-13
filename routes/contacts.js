const express = require('express');
const router = express.Router();
//Contacts are going to be associated to a specific user, so you can only get your own contacts
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

router.post('/', (req, res) => {
  res.send('Add new contacts');
});

router.put('/:id', (req, res) => {
  res.send('Update contacts');
});

router.delete('/:id', (req, res) => {
  res.send('Delete contacts');
});

module.exports = router;
