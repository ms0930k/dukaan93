const express = require('express');
const router = express.Router();

// Destructure specific functions from partyController
const { getParties, addParty, updateParty, deleteParty } = require('../controllers/partyController');

// GET all parties
router.get('/', getParties);

// POST to add a new party
router.post('/add', addParty);

// PUT to update an existing party
router.put('/update/:id', updateParty);

// DELETE to remove a party
router.delete('/delete/:id', deleteParty);

module.exports = router;
